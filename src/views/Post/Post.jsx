import React, { useEffect, useState } from "react";
import { createProp } from "../../config/handlers";
import styles from "./post.module.css";
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
  };

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

  return (
    <div>
      <div className={styles.bigContainer}>
        <form onSubmit={handleSubmit} className={styles.mainContainer}>
          <header>
            <h2>Post your Lodge</h2>
          </header>
          <div className={styles.inputContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.formGroup}>
                <label>Name:</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Type:</label>
                <input
                  type="text"
                  value={formData.type}
                  placeholder="Type of house"
                  readOnly
                />
                <div className={styles.forcedLine}></div>
                <select
                  name="type"
                  value={formData.type}
                  className={`${styles.selectPost} ${
                    formData.type.length === 0 ? styles.grayText : ""
                  }`}
                  onChange={handleTypes}
                >
                  <option value="">Choose type</option>

                  {types.map((op) => {
                    return (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Location:</label>

                <select
                  onChange={handleLocation}
                  name="state"
                  value={formData.location.state}
                  className={`${styles.selectLocation} ${
                    formData.location.state === "" ? styles.grayText : ""
                  }`}
                >
                  <option value="">Choose State</option>
                  {Object.keys(US_STATE_CITIES).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <div className={styles.forcedLine}></div>

                <select
                  onChange={handleLocation}
                  name="city"
                  value={formData.location.city}
                  className={`${styles.selectLocation} ${
                    formData.location.city === "" ? styles.grayText : ""
                  }`}
                >
                  <option value="">Choose City</option>

                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                <div className={styles.forcedLine}></div>
                <input
                  onChange={handleLocation}
                  type="text"
                  name="adress"
                  value={formData.location.adress}
                  placeholder="Adress"
                />
              </div>
            </div>
            <div className={styles.rightContainer}>
              <div className={`${styles.formGroup} ${styles.secondClass}`}>
                <div className={styles.roomsBox}>
                  <div className={styles.roomSelect}>
                    <label>Guests:</label>
                    <select
                      name="guest"
                      value={formData.stances.guest}
                      className={`${styles.opciones} ${
                        formData.stances.guest === 0 ? styles.grayText : ""
                      }`}
                      onChange={handelRooms}
                    >
                      {opciones.map((op) => (
                        <option key={op} value={op}>
                          {op}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.roomSelect}>
                    <label>Rooms:</label>

                    <select
                      name="rooms"
                      value={formData.stances.rooms}
                      className={`${styles.opciones} ${
                        formData.stances.rooms === 0 ? styles.grayText : ""
                      }`}
                      onChange={handelRooms}
                    >
                      {opciones.map((op) => (
                        <option key={op} value={op}>
                          {op}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.roomSelect}>
                    <label>Bathrooms:</label>
                    <select
                      name="bathrooms"
                      value={formData.stances.bathrooms}
                      className={`${styles.opciones} ${
                        formData.stances.bathrooms === 0 ? styles.grayText : ""
                      }`}
                      onChange={handelRooms}
                    >
                      {opciones.map((op) => (
                        <option key={op} value={op}>
                          {op}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.roomSelect}>
                    <label className={styles.beds}>Beds:</label>
                    <select
                      name="beds"
                      value={formData.stances.beds}
                      onChange={handelRooms}
                      className={`${styles.opciones} ${
                        formData.stances.beds === 0 ? styles.grayText : ""
                      }`}
                    >
                      {opciones.map((op) => (
                        <option key={op} value={op}>
                          {op}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className={`${styles.formGroup} ${styles.secondClass} ${styles.servicesCont}`}>
                <label>Services:</label>
                <select
                  name="services"
                  value={formData.services}
                  className={`${styles.selectServ} ${
                    formData.services.length === 0 ? styles.grayText : ""
                  }`}
                  onChange={handleServices}
                  multiple
                >
                  {servicesAvailable.map((srv) => (
                    <option
                      key={srv}
                      value={srv}
                      className={
                        formData.services.includes(srv)
                          ? styles.selectedOption
                          : ""
                      }
                    >
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`${styles.formGroup} ${styles.priceCont}`}>
  <label>Price per night:</label>
  <div className={styles.priceContainer}>
    <input
      type="range"
      name="price"
      value={formData.price}
      min="0"
      max="400"
      step="1"
      onChange={handleChange}
    />
    <div className={styles.inputRow}>
    <input
  type="number"
  name="price"
  value={formData.price}
  min="0"
  max="400"
  step="1"
  maxLength="3"
  onChange={handlePriceChange}
  className={`${styles.customInput} ${formData.price === 0 ? styles.grayText : ""}`}
/>



<span className={styles.spanPrice}>
  {(formData.price * 1.05).toFixed(2)} USD added 5% commission
</span>
    </div>
  </div>
</div>


              <div className={`${styles.formGroup} ${styles.fileBox}`}>
                <label htmlFor="imageFile" className={styles.customButton}>
                  Upload pics over here!
                </label>
                <input
                  className={styles.range}
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
            </div>
          </div>
          <div className={styles.formGroupUno}>
            <label>Description:</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button className={styles.btn} type="submit">
            Post Lodge
          </button>
          <button className={styles.btn} type="reset" onClick={resetForm}>
            Reset form
          </button>

          {errores[0] && <span className={styles.postError}>{errores[0]}</span>}
        </form>
      </div>
      <About />
    </div>
  );
};

export default Post;












// import React, { useEffect, useState } from "react";
// import { createProp } from "../../config/handlers";
// import styles from "./post.module.css";
// import About from "../../components/About/About";
// import ImagePreview from "../../components/ImagePreview/ImagePreview";
// import {
//   US_STATE_CITIES,
//   opciones,
//   types,
//   servicesAvailable,
// } from "./infoLocation";
// import {
//   validateName,
//   validateType,
//   validateLocation,
//   validateAddress,
//   validateStances,
//   validateServices,
//   validateDescription,
//   validateImageFiles,
//   validatePrice,
// } from "./validations";

// const Post = () => {
//   const [errores, setErrores] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     type: [],
//     location: {
//       city: "",
//       state: "",
//       adress: "",
//     },
//     stances: {
//       guest: 0,
//       rooms: 0,
//       bathrooms: 0,
//       beds: 0,
//     },
//     services: [],
//     description: "",
//     price: 0, //10 400
//     tokenMp: "",
//     imageFile: [], // Agrega el estado para almacenar el archivo de imagen
//     available: true, // Agrega el estado para almacenar el valor "disponible"
//   });

//   useEffect(() => {
//     if (formData.location.state && US_STATE_CITIES[formData.location.state]) {
//       setCities(US_STATE_CITIES[formData.location.state]);
//     } else {
//       setCities([]);
//     }
//   }, [formData.location.state]);

//   React.useEffect(() => {
//     const savedFormData = localStorage.getItem("formData");
//     if (savedFormData) {
//       setFormData(JSON.parse(savedFormData));
//     }
//   }, []);

//   React.useEffect(() => {
//     localStorage.setItem("formData", JSON.stringify(formData));
//   }, [formData]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errorMessages = [];

//     if (!validateName(formData.name)) {
//       errorMessages.push(
//         "Enter a valid name, no special characters, maximum 30 characters."
//       );
//     }
//     if (!validateType(formData.type)) {
//       errorMessages.push("Select at least one type of home.");
//     }
//     if (!validateLocation(formData.location)) {
//       errorMessages.push("Select a state, city and address.");
//     }
//     if (!validateAddress(formData.location.adress)) {
//       errorMessages.push(
//         "Select a valid address without special characters, must contain at least one number"
//       );
//     }
//     if (!validateStances(formData.stances)) {
//       errorMessages.push(
//         "Enter valid values for guests, rooms, bathrooms, and beds."
//       );
//     }

//     if (!validateServices(formData.services)) {
//       errorMessages.push("Select at least one service.");
//     }
//     if (!validatePrice(formData.price)) {
//       errorMessages.push("The minimum price should be 10 USD.");
//     }
//     if (!validateImageFiles(formData.imageFile)) {
//       errorMessages.push("Upload up to a maximum of 3 photos.");
//     }
//     if (!validateDescription(formData.description)) {
//       errorMessages.push(
//         "Description should be between 30 and 200 characters "
//       );
//     }

//     // Si no hay errores, entonces procesamos el formulario.
//     if (errorMessages.length === 0) {
//       try {
//         const formDataWithDefaultValues = {
//           ...formData,
//           available: formData.hasOwnProperty("available")
//             ? formData.available
//             : false,
//         };
//         await createProp(formDataWithDefaultValues, formData.imageFile);
//         setFormData({
//           name: "",
//           type: [],
//           location: {
//             city: "",
//             state: "",
//             adress: "",
//           },
//           stances: {
//             guest: 0,
//             rooms: 0,
//             bathrooms: 0,
//             beds: 0,
//           },
//           services: [],
//           description: "",
//           price: 0,
//           imageFile: [],
//           available: true,
//         });
//         console.log(formData)
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       setErrores(errorMessages);
//       setTimeout(() => {
//         setErrores([]);
//       }, 3000);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value, files } = event.target;
  
//     if (name === "imageFile") {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: [...prevState.imageFile, ...Array.from(files)],
//       }));
//     }else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };
  
//   const handlePriceChange = (event) => {
//     const value = event.target.value;
//     const newPrice = parseInt(value);
  
//     if (!isNaN(newPrice) && newPrice <= 400 && value.length <= 3) {
//       setFormData((prevState) => ({
//         ...prevState,
//         price: newPrice,
//       }));
//     } else if (value === "") { // Permitir que el input esté vacío para que el usuario pueda borrar
//       setFormData((prevState) => ({
//         ...prevState,
//         price: "",
//       }));
//     } else if (newPrice > 400) {
//       setFormData((prevState) => ({
//         ...prevState,
//         price: 400,
//       }));
//     } else if (value.length > 3) {
//       setFormData((prevState) => ({
//         ...prevState,
//         price: parseInt(value.slice(0, 3)),
//       }));
//     }
//   };
  
  

//   const handleTypes = (event) => {
//     const typ = event.target.value;

//     if (formData.type.includes(typ)) {
//       setFormData({
//         ...formData,
//         type: formData.type.filter((typeIn) => typeIn != typ),
//       });
//     } else {
//       setFormData({ ...formData, type: [...formData.type, typ] });
//     }
//   };

//   const handleServices = (event) => {
//     const serv = event.target.value;

//     if (formData.services.includes(serv)) {
//       setFormData({
//         ...formData,
//         services: formData.services.filter((servIn) => servIn != serv),
//       });
//     } else {
//       setFormData({ ...formData, services: [...formData.services, serv] });
//     }
//   };

//   const handleLocation = (event) => {
//     const { name, value } = event.target;

//     setFormData({
//       ...formData,
//       location: { ...formData.location, [name]: value },
//     });
//   };

//   const handelRooms = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       stances: { ...formData.stances, [name]: Number(value) },
//     });
//   };

//   const resetForm = () => {
//     return setFormData({
//       name: "",
//       type: [],
//       location: {
//         city: "",
//         state: "",
//         adress: "",
//       },
//       stances: {
//         guest: 0,
//         rooms: 0,
//         bathrooms: 0,
//         beds: 0,
//       },
//       services: [],
//       description: "",
//       price: 0,
//       imageFile: [],
//       available: true,
//     });
//   };

//   return (
//     <div>
//       <div className={styles.bigContainer}>
//         <form onSubmit={handleSubmit} className={styles.mainContainer}>
//           <header>
//             <h2>Post your Lodge</h2>
//           </header>
//           <div className={styles.inputContainer}>
//             <div className={styles.leftContainer}>
//               <div className={styles.formGroup}>
//                 <label>Name:</label>

//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Type:</label>
//                 <input
//                   type="text"
//                   value={formData.type}
//                   placeholder="Type of house"
//                   readOnly
//                 />
//                 <div className={styles.forcedLine}></div>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   className={`${styles.selectPost} ${
//                     formData.type.length === 0 ? styles.grayText : ""
//                   }`}
//                   onChange={handleTypes}
//                 >
//                   <option value="">Choose type</option>

//                   {types.map((op) => {
//                     return (
//                       <option key={op} value={op}>
//                         {op}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//               <div className={styles.formGroup}>
//                 <label>Location:</label>

//                 <select
//                   onChange={handleLocation}
//                   name="state"
//                   value={formData.location.state}
//                   className={`${styles.selectLocation} ${
//                     formData.location.state === "" ? styles.grayText : ""
//                   }`}
//                 >
//                   <option value="">Choose State</option>
//                   {Object.keys(US_STATE_CITIES).map((state) => (
//                     <option key={state} value={state}>
//                       {state}
//                     </option>
//                   ))}
//                 </select>
//                 <div className={styles.forcedLine}></div>

//                 <select
//                   onChange={handleLocation}
//                   name="city"
//                   value={formData.location.city}
//                   className={`${styles.selectLocation} ${
//                     formData.location.city === "" ? styles.grayText : ""
//                   }`}
//                 >
//                   <option value="">Choose City</option>

//                   {cities.map((city) => (
//                     <option key={city} value={city}>
//                       {city}
//                     </option>
//                   ))}
//                 </select>

//                 <div className={styles.forcedLine}></div>
//                 <input
//                   onChange={handleLocation}
//                   type="text"
//                   name="adress"
//                   value={formData.location.adress}
//                   placeholder="Adress"
//                 />
//               </div>
//             </div>
//             <div className={styles.rightContainer}>
//               <div className={`${styles.formGroup} ${styles.secondClass}`}>
//                 <div className={styles.roomsBox}>
//                   <div className={styles.roomSelect}>
//                     <label>Guests:</label>
//                     <select
//                       name="guest"
//                       value={formData.stances.guest}
//                       className={`${styles.opciones} ${
//                         formData.stances.guest === 0 ? styles.grayText : ""
//                       }`}
//                       onChange={handelRooms}
//                     >
//                       {opciones.map((op) => (
//                         <option key={op} value={op}>
//                           {op}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className={styles.roomSelect}>
//                     <label>Rooms:</label>

//                     <select
//                       name="rooms"
//                       value={formData.stances.rooms}
//                       className={`${styles.opciones} ${
//                         formData.stances.rooms === 0 ? styles.grayText : ""
//                       }`}
//                       onChange={handelRooms}
//                     >
//                       {opciones.map((op) => (
//                         <option key={op} value={op}>
//                           {op}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className={styles.roomSelect}>
//                     <label>Bathrooms:</label>
//                     <select
//                       name="bathrooms"
//                       value={formData.stances.bathrooms}
//                       className={`${styles.opciones} ${
//                         formData.stances.bathrooms === 0 ? styles.grayText : ""
//                       }`}
//                       onChange={handelRooms}
//                     >
//                       {opciones.map((op) => (
//                         <option key={op} value={op}>
//                           {op}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className={styles.roomSelect}>
//                     <label className={styles.beds}>Beds:</label>
//                     <select
//                       name="beds"
//                       value={formData.stances.beds}
//                       onChange={handelRooms}
//                       className={`${styles.opciones} ${
//                         formData.stances.beds === 0 ? styles.grayText : ""
//                       }`}
//                     >
//                       {opciones.map((op) => (
//                         <option key={op} value={op}>
//                           {op}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className={`${styles.formGroup} ${styles.secondClass} ${styles.servicesCont}`}>
//                 <label>Services:</label>
//                 <select
//                   name="services"
//                   value={formData.services}
//                   className={`${styles.selectServ} ${
//                     formData.services.length === 0 ? styles.grayText : ""
//                   }`}
//                   onChange={handleServices}
//                   multiple
//                 >
//                   {servicesAvailable.map((srv) => (
//                     <option
//                       key={srv}
//                       value={srv}
//                       className={
//                         formData.services.includes(srv)
//                           ? styles.selectedOption
//                           : ""
//                       }
//                     >
//                       {srv}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className={`${styles.formGroup} ${styles.priceCont}`}>
//   <label>Price per night:</label>
//   <div className={styles.priceContainer}>
//     <input
//       type="range"
//       name="price"
//       value={formData.price}
//       min="0"
//       max="400"
//       step="1"
//       onChange={handleChange}
//     />
//     <div className={styles.inputRow}>
//     <input
//   type="number"
//   name="price"
//   value={formData.price}
//   min="0"
//   max="400"
//   step="1"
//   maxLength="3"
//   onChange={handlePriceChange}
//   className={`${styles.customInput} ${formData.price === 0 ? styles.grayText : ""}`}
// />



// <span className={styles.spanPrice}>
//   {(formData.price * 1.05).toFixed(2)} USD added 5% commission
// </span>
//     </div>
//   </div>
// </div>


//               <div className={`${styles.formGroup} ${styles.fileBox}`}>
//                 <label htmlFor="imageFile" className={styles.customButton}>
//                   Upload pics over here!
//                 </label>
//                 <input
//                   className={styles.range}
//                   onChange={handleChange}
//                   type="file"
//                   name="imageFile"
//                   accept="image/*"
//                   multiple
//                   id="imageFile"
//                 />
//                 <div className={styles.imagePreviews}>
//                   {formData.imageFile.map((file, index) => (
//                     <ImagePreview key={index} image={file} thumbnailSize={40} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={styles.formGroupUno}>
//             <label>Description:</label>

//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>
//           <button className={styles.btn} type="submit">
//             Post Lodge
//           </button>
//           <button className={styles.btn} type="reset" onClick={resetForm}>
//             Reset form
//           </button>

//           {errores[0] && <span className={styles.postError}>{errores[0]}</span>}
//         </form>
//       </div>
//       <About />
//     </div>
//   );
// };

// export default Post;

