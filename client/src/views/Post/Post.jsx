import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './post.module.css';
import About from '../../components/About/About';

export const Post = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    services: '',
    image: '',
    description: '',
    price: ''
  });

  const opciones = [0, 1, 2, 3, 4, 5, 6]

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(formData)); 
    // Agrega lógica adicional aquí, como redireccionar al usuario
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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
  );
};