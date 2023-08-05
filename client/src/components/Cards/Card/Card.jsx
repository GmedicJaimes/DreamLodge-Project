import { Link } from "react-router-dom"
import styles from "./Card.module.css"
import React from 'react';



const Card = ({property}) => {
    const {name, price, image, location, id} = property
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