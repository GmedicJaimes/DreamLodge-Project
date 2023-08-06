import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions';

const Post= () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('user_id', data.user_id);
    formData.append('name', data.name);
    formData.append('types', JSON.stringify(data.types));
    formData.append('location', data.location);
    formData.append('rooms', data.rooms);
    formData.append('services', JSON.stringify(data.services));
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('imageFile', data.imageFile[0]); // la propiedad por ahora tendra una sola foto asi que tomamos la primer opcion nomas

    try {
      await dispatch(createPost(formData));
      alert('Property created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create property. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>User ID:</label>
        <input type="text" name="user_id" ref={register({ required: true })} />
        {errors.user_id && <span>This field is required.</span>}
      </div>
      <div>
        <label>Property Name:</label>
        <input type="text" name="name" ref={register({ required: true })} />
        {errors.name && <span>This field is required.</span>}
      </div>
      <div>
        <label>Property Types:</label>
        <input type="text" name="types" ref={register({ required: true })} />
        {errors.types && <span>This field is required.</span>}
      </div>
      <div>
        <label>Location:</label>
        <input type="text" name="location" ref={register({ required: true })} />
        {errors.location && <span>This field is required.</span>}
      </div>
      <div>
        <label>Rooms:</label>
        <input type="number" name="rooms" ref={register({ required: true })} />
        {errors.rooms && <span>This field is required.</span>}
      </div>
      <div>
        <label>Services:</label>
        <input type="text" name="services" ref={register({ required: true })} />
        {errors.services && <span>This field is required.</span>}
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" ref={register({ required: true })} />
        {errors.description && <span>This field is required.</span>}
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" ref={register({ required: true })} />
        {errors.price && <span>This field is required.</span>}
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="imageFile" ref={register({ required: true })} />
        {errors.imageFile && <span>This field is required.</span>}
      </div>
      <button type="submit">Create Property</button>
    </form>
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
