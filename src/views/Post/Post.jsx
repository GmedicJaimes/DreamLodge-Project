import React, { useEffect, useState } from "react";
import { createProp } from "../../config/handlers";
import styles from "./post.module.css";
import About from "../../components/About/About";
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
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
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
        [name]: [...prevState.imageFile, ...Array.from(files)], // Añade los nuevos archivos a la lista existente
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }}


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
    })
   
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
              <div className={`${styles.formGroup} ${styles.secondClass}`}>
                <label>Services:</label>

                <input type="text" value={formData.services} readOnly />
                <div className={styles.forcedLine}></div>
                <select
                  name="services"
                  value={formData.services}
                  className={`${styles.selectServ} ${
                    formData.services.length === 0 ? styles.grayText : ""
                  }`}
                  onChange={handleServices}
                >
                  <option value="">Choose services</option>

                  {servicesAvailable.map((srv) => {
                    return (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div
                className={`${styles.formGroup} ${styles.secondClass} ${styles.inputPrice}`}
              >
                <label>Price:</label>
                <input
                  type="range"
                  name="price"
                  value={formData.price}
                  min="0" // Valor mínimo
                  max="400" // Valor máximo
                  step="1" // Paso de incremento/decremento
                  onChange={handleChange}
                />
                <span
                  className={`${styles.spanPrice} ${
                    formData.price === 0 ? styles.grayText : ""
                  }`}
                >
                  {formData.price} USD
                </span>

                {/* Muestra el valor seleccionado */}
              </div>

              <div className={`${styles.formGroup} ${styles.secondClass} ${styles.fileBox}`}>
                <label htmlFor="imageFile" className={styles.customButton}>Image:</label>
                <input
                  className={styles.range}
                  onChange={handleChange}
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  multiple
                  id="imageFile"
                />
                <p>
  {formData.imageFile.length > 0
    ? formData.imageFile.map((file, index) => (
        <span key={index} className={styles.spanImg}>{file.name} </span>
      ))
    : "No image selected"}
</p>
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

// import React, { useState } from 'react';
// import  { createProp }  from '../../config/handlers';
// import styles from "./post.module.css"
// import About from "../../components/About/About"

// const Post = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     type: [],
//     location: {
//       city: "",
//       state: "",
//       adress: ""
//     },
//     stances: {
//       guest: 0,
//       rooms: 0,
//       bathrooms: 0,
//       beds: 0
//     },
//     services: [],
//     description: '',
//     price: 0,//10 400
//     tokenMp: "",
//     imageFile: null, // Agrega el estado para almacenar el archivo de imagen
//     disponible: false, // Agrega el estado para almacenar el valor "disponible"
//   })

// const opciones = [0, 1, 2, 3, 4, 5, 6];
// const types = ["Cabins", "Beachfront", "Mansion", "Countryside", "Room"];
// const servicesAvailable = ["Wifi", "TV", "Kitchen", "A/C", "Washing Machine", "Safe-deposit box", "Heating", "Pets allowed", "Garage", "Coffee maker"]

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//       // Asegurémonos de que el campo "disponible" tenga un valor booleano antes de llamar a createProp
//       const formDataWithDefaultValues = {
//         ...formData,
//         disponible: formData.hasOwnProperty('disponible') ? formData.disponible : false,
//       };
//       await createProp(formDataWithDefaultValues, formData.imageFile); // Llama a la función para crear una propiedad
//       setFormData({
//         name: '',
//         type: [],
//         location: {
//           city: "",
//           state: "",
//           adress: ""
//         },
//         stances: {
//           guest: 0,
//           rooms: 0,
//           bathrooms: 0,
//           beds: 0
//         },
//         services: [],
//         description: '',
//         price: 0,
//         tokenMp: "",
//         imageFile: null,
//         disponible: false,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value, files } = event.target;

//     if (name === 'imageFile') {
//       setFormData({
//         ...formData,
//         [name]: files[0], // Almacena el archivo de imagen en el estado
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   }

//   const handleTypes = (event) => {
//     const typ = event.target.value

//     if (formData.type.includes(typ)) {
//       setFormData({
//         ...formData,
//         type : formData.type.filter((typeIn) => typeIn != typ)
//       })
//     } else {
//       setFormData({ ...formData, type: [...formData.type, typ]})
//     }
//   }

//   const handleServices = (event) => {
//     const serv = event.target.value

//     if (formData.services.includes(serv)) {
//       setFormData({
//         ...formData,
//         services : formData.services.filter((servIn) => servIn != serv)
//       })
//     } else {
//       setFormData({ ...formData, services: [...formData.services, serv]})
//     }
//   }

//   const handleLocation = (event) => {
//     const { name, value } = event.target

//     setFormData({
//       ...formData,
//       location: {...formData.location, [name] : value }
//     })
//   }

//   const handelRooms = (event) => {
//     const { name, value } = event.target

//     setFormData({
//       ...formData,
//       stances: {...formData.stances, [name] : value }
//     })
//   }

//   return (
//     <div>
//       <div className={styles.bigContainer}>
//         <form onSubmit={handleSubmit} className={styles.mainContainer}>
//           <header>
//             <h2>Post your Lodge</h2>
//           </header>
//           <div className={styles.inputContainer}>
//           <div className={styles.formGroup}>
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Type:</label>
//             <input type="text" value={formData.type} readOnly/>
//             <div className={styles.forcedLine}></div>
//             <select name="type" value={formData.type} onChange={handleTypes}>
//               {
//                   types.map((op) => {
//                     return(
//                       <option key={op} value={op}>{op}</option>
//                     )})
//               }
//             </select>
//           </div>
//           <div className={styles.formGroup}>
//             <label>Location:</label>
//             <input onChange={handleLocation} type="text" name="city" value={location.city} placeholder='City'/>
//             <div className={styles.forcedLine}></div>
//             <input onChange={handleLocation} type="text" name="state" value={location.state} placeholder='State'/>
//             <div className={styles.forcedLine}></div>
//             <input onChange={handleLocation} type="text" name="adress" value={location.adress} placeholder='Adress'/>
//           </div>
//           <div className={styles.formGroup}>
//             <div className={styles.roomsBox}>
//             <div className={styles.roomSelect}>
//               <label>Guests:</label>
//               <select name="guest" value={formData.stances.guest} onChange={handelRooms}>
//                 {opciones.map((op) => (
//                   <option key={op} value={op}>
//                     {op}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className={styles.roomSelect}>
//               <label>Rooms:</label>
//               <select name="rooms" value={formData.stances.rooms} onChange={handelRooms}>
//                 {opciones.map((op) => (
//                   <option key={op} value={op}>
//                     {op}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className={styles.roomSelect}>
//               <label>Bathrooms:</label>
//               <select name="bathrooms" value={formData.stances.bathrooms} onChange={handelRooms}>
//                 {opciones.map((op) => (
//                   <option key={op} value={op}>
//                     {op}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className={styles.roomSelect}>
//               <label>Beds:</label>
//               <select name="beds" value={formData.stances.beds} onChange={handelRooms}>
//                 {opciones.map((op) => (
//                   <option key={op} value={op}>
//                     {op}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             </div>
//           </div>
//           <div className={styles.formGroup}>
//             <label>Services:</label>
//             <input type="text" value={formData.services} readOnly/>
//             <div className={styles.forcedLine}></div>
//             <select name="services" value={formData.services} onChange={handleServices}>
//               {
//                   servicesAvailable.map((srv) => {
//                     return(
//                       <option key={srv} value={srv}>{srv}</option>
//                     )})
//               }
//             </select>
//           </div>
//           <div className={styles.formGroup}>
//             <label>Description:</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Price:</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Token Mercado Pago</label>
//             <input
//               className={styles.range}
//               onChange={handleChange}
//               type="text"
//               name="tokenMp"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Image:</label>
//             <input
//               className={styles.range}
//               onChange={handleChange}
//               type="file"
//               name="imageFile"
//               accept="image/*"
//             />
//             <p>{formData.imageFile?.name || "No image selected"}</p>
//           </div>
//           <button className={styles.btn} type="submit">Post Lodge</button>
//           </div>
//         </form>
//       </div>
//       <About />
//     </div>
//   );
// };

// export default Post;
