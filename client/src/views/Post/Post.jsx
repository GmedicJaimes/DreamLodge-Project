import React, { useState } from 'react';
import  { createProp }  from '../../config/handlers';
import styles from "./post.module.css"
import About from "../../components/About/About"

const Post = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: [],
    location: {
      city: "",
      state: "",
      adress: ""
    },
    stances: {
      guest: 0,
      rooms: 0,
      bathrooms: 0,
      beds: 0
    },
    services: [],
    description: '',
    price: 0,//10 400
    tokenMp: "",
    imageFile: null, // Agrega el estado para almacenar el archivo de imagen
    available: false, // Agrega el estado para almacenar el valor "disponible"
  })

  React.useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

const opciones = [0, 1, 2, 3, 4, 5, 6];
const types = ["Cabins", "Beachfront", "Mansion", "Countryside", "Room"];
const servicesAvailable = ["Wifi", "TV", "Kitchen", "A/C", "Washing Machine", "Safe-deposit box", "Heating", "Pets allowed", "Garage", "Coffee maker"]

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // Asegurémonos de que el campo "disponible" tenga un valor booleano antes de llamar a createProp
      const formDataWithDefaultValues = {
        ...formData,
        available: formData.hasOwnProperty('available') ? formData.available : false,
      };
      await createProp(formDataWithDefaultValues, formData.imageFile); // Llama a la función para crear una propiedad
      setFormData({
        name: '',
        type: [],
        location: {
          city: "",
          state: "",
          adress: ""
        },
        stances: {
          guest: 0,
          rooms: 0,
          bathrooms: 0,
          beds: 0
        },
        services: [],
        description: '',
        price: 0,
        tokenMp: "",
        imageFile: null,
        available: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'imageFile') {
      setFormData({
        ...formData,
        [name]: files[0], // Almacena el archivo de imagen en el estado
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }
  
  const handleTypes = (event) => {
    const typ = event.target.value
  
    if (formData.type.includes(typ)) {
      setFormData({
        ...formData, 
        type : formData.type.filter((typeIn) => typeIn != typ)
      })
    } else {
      setFormData({ ...formData, type: [...formData.type, typ]})
    }
  }

  const handleServices = (event) => {
    const serv = event.target.value
  
    if (formData.services.includes(serv)) {
      setFormData({
        ...formData, 
        services : formData.services.filter((servIn) => servIn != serv)
      })
    } else {
      setFormData({ ...formData, services: [...formData.services, serv]})
    }
  }

  const handleLocation = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      location: {...formData.location, [name] : value }
    })
  }

  const handelRooms = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      stances: {...formData.stances, [name] : value }
    })
  }

  return (
    <div>
      <div className={styles.bigContainer}>
        <form onSubmit={handleSubmit} className={styles.mainContainer}>
          <header>
            <h2>Post your Lodge</h2>
          </header>
          <div className={styles.inputContainer}>
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
            <input type="text" value={formData.type} readOnly/>
            <div className={styles.forcedLine}></div>
            <select name="type" value={formData.type} onChange={handleTypes}>
              {
                  types.map((op) => {
                    return(
                      <option key={op} value={op}>{op}</option>
                    )})
              }
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Location:</label>
            <input onChange={handleLocation} type="text" name="city" value={location.city} placeholder='City'/>
            <div className={styles.forcedLine}></div>
            <input onChange={handleLocation} type="text" name="state" value={location.state} placeholder='State'/>
            <div className={styles.forcedLine}></div>
            <input onChange={handleLocation} type="text" name="adress" value={location.adress} placeholder='Adress'/>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.roomsBox}>
            <div className={styles.roomSelect}>
              <label>Guests:</label>
              <select name="guest" value={formData.stances.guest} onChange={handelRooms}>
                {opciones.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.roomSelect}>  
              <label>Rooms:</label>
              <select name="rooms" value={formData.stances.rooms} onChange={handelRooms}>
                {opciones.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.roomSelect}>
              <label>Bathrooms:</label>
              <select name="bathrooms" value={formData.stances.bathrooms} onChange={handelRooms}>
                {opciones.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.roomSelect}>
              <label>Beds:</label>
              <select name="beds" value={formData.stances.beds} onChange={handelRooms}>
                {opciones.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Services:</label>
            <input type="text" value={formData.services} readOnly/>
            <div className={styles.forcedLine}></div>
            <select name="services" value={formData.services} onChange={handleServices}>
              {
                  servicesAvailable.map((srv) => {
                    return(
                      <option key={srv} value={srv}>{srv}</option>
                    )})
              }
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Token Mercado Pago</label>
            <input
              className={styles.range}
              onChange={handleChange} 
              type="text" 
              name="tokenMp" 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Image:</label>
            <input
              className={styles.range}
              onChange={handleChange}
              type="file"
              name="imageFile"
              accept="image/*"
            />
            <p>{formData.imageFile?.name || "No image selected"}</p>
          </div>
          <button className={styles.btn} type="submit">Post Lodge</button>
          </div>
        </form>
      </div>
      <About />
    </div>
  );
};

export default Post;






// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import styles from './post.module.css';
// import About from '../../components/About/About';
// import { createPost } from './redux/actions'; // Importa la acción para crear una propiedad

// export const Post = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     location: '',
//     rooms: 0,
//     services: '',
//     description: '',
//     price: 0,
//     imageFile: null, // Agrega el estado para almacenar el archivo de imagen
//   });

//   const opciones = [0, 1, 2, 3, 4, 5, 6];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createPost(formData)); // Llama a la acción para crear una propiedad
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'imageFile') {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: files[0], // Almacena el archivo de imagen en el estado
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   return (
//     <div>
//       <div className={styles.bigContainer}>
//         <form onSubmit={handleSubmit} className={styles.mainContainer}>
//           <header>
//             <h2>Create your account</h2>
//           </header>
//           <div className={styles.formGroup}>
//             <label>
//               Name:
//               <input type="text" name="name" value={formData.name} onChange={handleChange} />
//             </label>
//           </div>
//           {/* ... Resto del formulario ... */}
//           <div className={styles.formGroup}>
//             <label>
//               Image:
//               <input
//                 className={styles.range}
//                 onChange={handleChange}
//                 type="file"
//                 name="imageFile"
//                 accept="image/*"
//               />
//               <p>{formData.imageFile?.name || 'No se ha seleccionado ninguna imagen'}</p>
//             </label>
//           </div>
//           <button className={styles.btn} type="submit">
//             Crear Posteo
//           </button>
//         </form>
//       </div>
//       <About />
//     </div>
//   );
// };
