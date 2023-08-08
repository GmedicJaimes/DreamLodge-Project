import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { createPost } from '../../redux/actions';
import  { createProp }  from '../../config/handlers';
import styles from "./post.module.css"
import About from "../../components/About/About"

const Post = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: [],
    location: {
      adress: '',
      state: '',
      city: '',
    },
    rooms: 0,
    services: '',
    description: '',
    price: 0,
    imageFile: null, // Agrega el estado para almacenar el archivo de imagen
    disponible: false, // Agrega el estado para almacenar el valor "disponible"
  });
console.log(formData)
const opciones = [0, 1, 2, 3, 4, 5, 6];
const types = ["Cabins", "Beachfront", "Mansion", "Countryside", "Room"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asegurémonos de que el campo "disponible" tenga un valor booleano antes de llamar a createProp
      const formDataWithDefaultValues = {
        ...formData,
        disponible: formData.hasOwnProperty('disponible') ? formData.disponible : false,
      };
      await createProp(formDataWithDefaultValues, formData.imageFile); // Llama a la función para crear una propiedad
      // Limpiar el formulario después de crear la propiedad
       // Llama a getPropertiesList aquí para actualizar la lista de propiedades
      setFormData({
        name: '',
        type: [],
        location: {
          adress: '',
          state: '',
          city: '',
        },
        rooms: 0,
        services: '',
        description: '',
        price: 0,
        imageFile: null,
        disponible: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Almacena el archivo de imagen en el estado
      }));
    } else if (name === 'location.adress' || name === 'location.state' || name === 'location.city') {
      // const locationFieldName = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleTypes =(e)=>{
    const selectType = e.target.value
    setFormData({
      ...formData,
      type:[...formData.type, selectType]
  })
  };

  return (
    <div>
      <div className={styles.bigContainer}>
        <form onSubmit={handleSubmit} className={styles.mainContainer}>
          <header>
            <h2>Create your account</h2>
          </header>
          <div className={styles.formGroup}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Type:
              <select name="type" value={formData.type} onChange={(e)=>handleTypes(e)}>
                {types.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
                <ul><li>{formData.type.map(el=> el+" - ")}</li></ul>
            </label>
          </div>
          <div className={styles.formGroup}>
  <label>
    Adress:
    <input
      type="text"
      name="location.adress"
      value={location.adress}
      onChange={handleChange}
    />
  </label>
</div>
<div className={styles.formGroup}>
  <label>
    State:
    <input
      type="text"
      name="location.state"
      value={location.state}
      onChange={handleChange}
    />
  </label>
</div>
<div className={styles.formGroup}>
  <label>
    City:
    <input
      type="text"
      name="location.city"
      value={location.city}
      onChange={handleChange}
    />
  </label>
</div>

          <div className={styles.formGroup}>
            <label>
              Rooms:
              <select name="rooms" value={formData.rooms} onChange={handleChange}>
                {opciones.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Services:
              <input
                type="text"
                name="services"
                value={formData.services}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Image:
              <input
                className={styles.range}
                onChange={handleChange}
                type="file"
                name="imageFile"
                accept="image/*"
              />
              <p>{formData.imageFile?.name || 'No se ha seleccionado ninguna imagen'}</p>
            </label>
          </div>
          <button className={styles.btn} type="submit">
            Crear Propiedad
          </button>
        </form>
      </div>
      {/* <About /> */}
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
