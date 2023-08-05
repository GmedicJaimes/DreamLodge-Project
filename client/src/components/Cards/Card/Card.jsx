import { Link } from "react-router-dom"
import styles from "./Card.module.css"
import React from 'react';



const Card = ({property}) => {
<<<<<<< HEAD
    const {name, price, image, location, id} = property
=======
    const {id, name, price, types, image, location} = property
>>>>>>> 5ba320e28bf67309bc2c1815cb74a09a56a9c265
    return(
      <Link to={`/rooms/${id}`} className={styles.link}>
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={image} alt="" />
            </div>
            <section className={styles.info}>
                <h3>{location.state}, {location.city}</h3>
                <p>{name}</p>
                <p>$ {price} USD noche</p>
   
            </section>
        </div>
      </Link>
    )
}

export default Card