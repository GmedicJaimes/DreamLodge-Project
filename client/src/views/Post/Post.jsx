import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


const Post = () => {
  const dispatch = useDispatch();
  //hola perros
  const [formData, setFormData] = useState({
    // user_id: '',
    name: "",
    types: [],
    location: {
      adress: "",
      city: "",
      state: ""
    },
    rooms: [0,0,0,0],
    services: [],
    description: "",
    price: 0,
    // imageFile: null,
  });

  const typeProperties = ["Cabins", "Beachfront", "Mansions", "Countryside", "Rooms"]
  const citys = [ "Los Santos", "San Fierro", "Las Venturas", "Liberty City", "Vice City", "Carcer City"]
  const states = ["Peru", "Mexico", "Bolivia"]

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleType = (event) => {
    const type = event.target.value
  
    if (formData.types.includes(type)) {
      setFormData({
        ...formData, 
        types : formData.types.filter((typeIn) => typeIn != type)
      })
    } else {
      setFormData({ ...formData, types: [...formData.types, type]})
    }
}

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setFormData({
  //     ...formData,
  //     imageFile: file,
  //   });
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      await dispatch(createPost(formData)); // Enviar el objeto formData completo
      
      alert('Property created successfully!');
    } catch (error) {
      console.error(error);
      // alert('Failed to create property. Please try again.');
    }
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <header>
          <h2>Post your lodge</h2>
        </header>
        <form onSubmit={onSubmit}>
          {/* <div className={styles.formGroup}>
            <label>User ID:</label>
            <input type="text" name="user_id" value={formData.user_id} onChange={handleInputChange} required />
          </div> */}
          <div className={styles.formGroup}>
            <label>Property Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Property Types:</label>
            <select name="" onChange={handleType}>
              {
                  typeProperties.map((type) => {
                    return(
                      <option key={type} value={type}>{type}</option>
                    )})
              }
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Location:</label>
            <input type="text" value={formData.types} readOnly/>
            <div className={styles.forcedLine}></div>
            <select name="" onChange={handleType}>
              {
                  citys.map((city) => {
                    return(
                      <option key={city} value={city}>{city}</option>
                    )})
              }
            </select>
            <select name="" onChange={handleType}>
              {
                  states.map((state) => {
                    return(
                      <option key={state} value={state}>{state}</option>
                    )})
              }
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Rooms:</label>
            <input type="number" name="rooms" value={formData.rooms} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Services:</label>
            <input type="text" name="services" value={formData.services} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Price:</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
          </div>
          {/* <div className={styles.formGroup}>
            <label>Image:</label>
            <input type="file" name="imageFile" onChange={handleFileChange} required />
          </div> */}
          <button className={styles.btn} type="submit">Create Property</button>
        </form>
      </div>
      <About/>
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
