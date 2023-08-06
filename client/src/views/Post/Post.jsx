import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions';

const Post = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    types: '',
    location: '',
    rooms: 0,
    services: '',
    description: '',
    price: 0,
    imageFile: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      imageFile: file,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createPost(formData)); // Enviar el objeto formData completo
      alert('Property created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create property. Please try again.');
    }
  };

  return (
<<<<<<< HEAD
    <div>
    <div className={styles.bigContainer}>
      <form onSubmit={handleSubmit} className={styles.mainContainer}>
        <header>
          <h2>Create your account</h2>
        </header>
        <div className={styles.formGroup}>
          <label className={styles.labelName}>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            Tipo:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="cabaña">Cabaña</option>
              <option value="casa_playa">Casa de Playa</option>
              {/* Agrega más opciones aquí */}
            </select>
          </label>
        </div>
        <div className={styles.formGroup}>
          <h3>Location</h3>
          <label>
            Country:
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            State:
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            Direction:
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </label>
        </div>
        <div className={styles.formGroup}>
          <h3>Rooms</h3>
          <div className={styles.roomsSelects}>
            <div>
            <label>
            Travellers:
            <select name="" id="" className={styles.opciones}>
                {
                  opciones.map((opt)=>{
                    return(
                      <option value={opt}>{opt}</option>
                    )
                  })
                }
              </select>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              rooms:
              <select name="" id="">
                {
                  opciones.map((opt)=>{
                    return(
                      <option value={opt}>{opt}</option>
                    )
                  })
                }
              </select>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Bathrooms:
              <select name="" id="">
                {
                  opciones.map((opt)=>{
                    return(
                      <option value={opt}>{opt}</option>
                    )
                  })
                }
              </select>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label>
              Beds:
              <select name="" id="">
                {
                  opciones.map((opt)=>{
                    return(
                      <option value={opt}>{opt}</option>
                    )
                  })
                }
              </select>
            </label>
          </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>
            Services:
            <select name="services" value={formData.services} onChange={handleChange}>
              <option value="wifi">Wifi</option>
              <option value="piscina">Piscina</option>
              {/* Agrega más opciones aquí */}
            </select>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            Image:
            <input type="file" name="image" value={formData.image} onChange={handleChange} />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            Description:
            <textarea type="text" name="description" value={formData.description} onChange={handleChange} />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            Price:
            <input className={styles.range} onChange={handleChange} type="range" name="price" value={formData.price}/><p>{formData.price}</p>
          </label>
        </div>
        <button className={styles.btn} type="submit">Crear Posteo</button>
      </form>
    </div>
      <About/>
    </div>
=======
    <form onSubmit={onSubmit}>
      <div>
        <label>User ID:</label>
        <input type="text" name="user_id" value={formData.user_id} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Property Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Property Types:</label>
        <input type="text" name="types" value={formData.types} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Rooms:</label>
        <input type="number" name="rooms" value={formData.rooms} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Services:</label>
        <input type="text" name="services" value={formData.services} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="imageFile" onChange={handleFileChange} required />
      </div>
      <button type="submit">Create Property</button>
    </form>
>>>>>>> main
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
