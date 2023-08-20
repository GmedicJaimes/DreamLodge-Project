import React, { useEffect, useState } from "react";
import { createProp } from "../../config/handlers";
import styles from "./PostForm.module.css"
import About from "../../components/About/About";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import {
  US_STATE_CITIES,
  opciones,
  types,
  servicesAvailable,
} from "./infoLocation";
import {
  validateName,
  validateType,
  validateLocation,
  validateAddress,
  validateStances,
  validateServices,
  validateDescription,
  validateImageFiles,
  validatePrice,
} from "./validations";

const Post = () => {
  const [errores, setErrores] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    type: [],
    location: {
      city: "",
      state: "",
      adress: "",
    },
    stances: {
      guest: 0,
      rooms: 0,
      bathrooms: 0,
      beds: 0,
    },
    services: [],
    description: "",
    price: 0, //10 400
    tokenMp: "",
    imageFile: [], // Agrega el estado para almacenar el archivo de imagen
    available: true, // Agrega el estado para almacenar el valor "disponible"
  });

  useEffect(() => {
    if (formData.location.state && US_STATE_CITIES[formData.location.state]) {
      setCities(US_STATE_CITIES[formData.location.state]);
    } else {
      setCities([]);
    }
  }, [formData.location.state]);

  React.useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessages = [];

    if (!validateName(formData.name)) {
      errorMessages.push(
        "Enter a valid name, no special characters, maximum 30 characters."
      );
    }
    if (!validateType(formData.type)) {
      errorMessages.push("Select at least one type of home.");
    }
    if (!validateLocation(formData.location)) {
      errorMessages.push("Select a state, city and address.");
    }
    if (!validateAddress(formData.location.adress)) {
      errorMessages.push(
        "Select a valid address without special characters, must contain at least one number"
      );
    }
    if (!validateStances(formData.stances)) {
      errorMessages.push(
        "Enter valid values for guests, rooms, bathrooms, and beds."
      );
    }

    if (!validateServices(formData.services)) {
      errorMessages.push("Select at least one service.");
    }
    if (!validatePrice(formData.price)) {
      errorMessages.push("The minimum price should be 10 USD.");
    }
    if (!validateImageFiles(formData.imageFile)) {
      errorMessages.push("Upload up to a maximum of 3 photos.");
    }
    if (!validateDescription(formData.description)) {
      errorMessages.push(
        "Description should be between 30 and 200 characters "
      );
    }

    // Si no hay errores, entonces procesamos el formulario.
    if (errorMessages.length === 0) {
      try {
        const formDataWithDefaultValues = {
          ...formData,
          available: formData.hasOwnProperty("available")
            ? formData.available
            : false,
        };
        await createProp(formDataWithDefaultValues, formData.imageFile);
        setFormData({
          name: "",
          type: [],
          location: {
            city: "",
            state: "",
            adress: "",
          },
          stances: {
            guest: 0,
            rooms: 0,
            bathrooms: 0,
            beds: 0,
          },
          services: [],
          description: "",
          price: 0,
          imageFile: [],
          available: true,
        });

        resetForm(); // reiniciar el formulario después de la publicación exitosa
        alertPost(); // Mostrar la alerta de publicación exitosa
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrores(errorMessages);
      setTimeout(() => {
        setErrores([]);
      }, 3000);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    // console.log(formData);
    if (name === "imageFile") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: [...prevState.imageFile, ...Array.from(files)],
      }));
    }else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  const handlePriceChange = (event) => {
    const value = event.target.value;
    const newPrice = parseInt(value);
  
    if (!isNaN(newPrice) && newPrice <= 400 && value.length <= 3) {
      setFormData((prevState) => ({
        ...prevState,
        price: newPrice,
      }));
    } else if (value === "") { // Permitir que el input esté vacío para que el usuario pueda borrar
      setFormData((prevState) => ({
        ...prevState,
        price: "",
      }));
    } else if (newPrice > 400) {
      setFormData((prevState) => ({
        ...prevState,
        price: 400,
      }));
    } else if (value.length > 3) {
      setFormData((prevState) => ({
        ...prevState,
        price: parseInt(value.slice(0, 3)),
      }));
    }
  };
  
  const handleTypes = (event) => {
    const typ = event.target.value;

    if (formData.type.includes(typ)) {
          setFormData({
            ...formData,
            type: formData.type.filter((typeIn) => typeIn != typ),
          });
        } else {
          setFormData({ ...formData, type: [...formData.type, typ] });
        }

  } 


  const handleServices = (event) => {
    const serv = event.target.value;

    if (formData.services.includes(serv)) {
      setFormData({
        ...formData,
        services: formData.services.filter((servIn) => servIn != serv),
      });
    } else {
      setFormData({ ...formData, services: [...formData.services, serv] });
    }
  };

  const handleLocation = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      location: { ...formData.location, [name]: value },
    });
  };

  const handelRooms = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      stances: { ...formData.stances, [name]: Number(value) },
    });
  };

  const resetForm = () => {
    return setFormData({
      name: "",
      type: [],
      location: {
        city: "",
        state: "",
        adress: "",
      },
      stances: {
        guest: 0,
        rooms: 0,
        bathrooms: 0,
        beds: 0,
      },
      services: [],
      description: "",
      price: 0,
      imageFile: [],
      available: true,
    });
  };

  const alertPost = () => {
    swal("Success", "The property has been published successfully", "success");
  };

  return (
    <div className={styles.bodyContainerForm}>
      <div className={styles.bigContainer}>
          <header>
            <h2>Post your Lodge</h2>
          </header>
          <form className={styles.postLodge} onSubmit={handleSubmit}>
          <section className={styles.firstColumn}>
            <div className={styles.name}>
              <label htmlFor="">Choose a name for your Lodge: </label>
              <input type="text" 
              placeholder="A beautifull name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              />
            </div>
            <div className={styles.fClow}>
              <section className={styles.fCleft}>
              <div className={styles.typesBox}>
                <label>Type(s) of Lodge: </label>
                {
                  types.map((typeBtn) => { 
                    return(
                      <button
                      key={typeBtn} 
                      className={ 
                        formData.type.includes(typeBtn) 
                        ? styles.buttonTypeA
                        : styles.buttonType} 
                      onClick={handleTypes}
                      type="button" 
                      name="type" 
                      value={typeBtn}>{typeBtn}</button>
                    )})
                }
                </div>

                <div className={styles.locationBox}>
                <label htmlFor="">Location</label>
                <select
                  onChange={handleLocation}
                  name="state"
                  value={formData.location.state}
                  className={styles.selectPostForm}
                >
                  <option value="" disabled selected hidden>Choose State</option>
                  {Object.keys(US_STATE_CITIES).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <select
                  onChange={handleLocation}
                  name="city"
                  value={formData.location.city}
                  className={styles.selectPostForm}
                >
                  <option value="" disabled selected hidden>Choose City</option>

                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <input
                  onChange={handleLocation}
                  type="text"
                  name="adress"
                  value={formData.location.adress}
                  placeholder="Adress"
                />
                </div>
              </section>
              <section className={styles.fCright}>
                <label htmlFor="">Services provided: </label>
                <div className={styles.serviceBtns}>
                  {
                    servicesAvailable.map((serviceI) => {
                      return(
                        <button
                        key={serviceI}
                        name="service"
                        type="button" 
                        onClick={handleServices}
                        className={
                          formData.services.includes(serviceI)
                          ? styles.active
                          : styles.inactive
                        }
                        value={serviceI}
                        >{serviceI}</button>
                      )})
                  }
                </div>
              </section>
            </div>
          </section>
          <section className={styles.secondColumn}>
                <p>Rooms in the Lodge: </p>
                <section className={styles.roomsLodge}>
                  <div>
                      <label>Guest capacity: </label>
                      <input type="number" 
                      min="0" max="6"
                      name="guest"
                      value={formData.stances.guest}
                      onChange={handelRooms}
                      step="1"
                      />
                  </div>
                  <div>
                      <label>Rooms available: </label>
                      <input type="number" 
                      min="0" max="6"
                      onChange={handelRooms}
                      name="rooms"
                      value={formData.stances.rooms}
                      step="1"
                      />
                  </div>
                  <div>
                      <label>Bathrooms: </label>
                      <input type="number" 
                      min="0" max="6"
                      onChange={handelRooms}
                      name="bathrooms"
                      value={formData.stances.bathrooms}
                      step="1"
                      />
                  </div>
                  <div>
                      <label>Beds in the Lodge: </label>
                      <input type="number" 
                      min="0" max="6"
                      onChange={handelRooms}
                      name="beds"
                      value={formData.stances.beds}
                      step="1"
                      />
                  </div>
                </section>
                <section className={styles.description}>
                  <label htmlFor="">Write a nice description :)</label>
                  <textarea name="description" 
                  cols="30" rows="10"
                  value={formData.description}
                  onChange={handleChange}
                  ></textarea>
                </section>
          </section>
          <section className={styles.thirdColumn}>
            <div className={styles.priceBox}>
                <label htmlFor="">Price per Night:</label>
                <input type="number" 
                  min="0" max="400"
                  name="price"
                  maxLength="3"
                  value={formData.price}
                  onChange={handleChange}
                />
                <span className={styles.spanPrice}>
                  {(formData.price * 1.05).toFixed(2)} USD added 5% commission
                </span>
            </div>
            <div className={styles.imageBlock}>
              <label htmlFor="">Upload some nice photos :D</label>
              <input
                  onChange={handleChange}
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  multiple
                  id="imageFile"
                />
                <div className={styles.imagePreviews}>
                  {formData.imageFile.map((file, index) => (
                    <ImagePreview key={index} image={file} thumbnailSize={40} />
                  ))}
                </div>
            </div>
          </section>
          <section className={styles.btnFoot}>
            <button type="submit"  onClick={handleSubmit}>Post Lodge</button>
            <button type="button" onClick={resetForm}>Reset Form</button>
          </section>
          </form>
          {errores[0] && <span className={styles.postError}>{errores[0]}</span>}
      </div>
      <About />
    </div>
  );
};

export default Post;
