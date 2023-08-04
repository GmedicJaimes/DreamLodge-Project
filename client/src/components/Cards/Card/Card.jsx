import { Link } from "react-router-dom"
import styles from "./Card.module.css"
import React from 'react';



const Card = ({property}) => {
    const {name, price, location} = property
    return(
      <Link to={"/users/:user_id/properties/:property_id"}>
        <div className={styles.container}>
            <section className={styles.image}>
                <img src="filters.jpg" alt="casa"/>
            </section>
            <section className={styles.info}>
                <h1>{name}</h1>
                <p>{price}</p>
                <p>{location}</p>

                    
            </section>
        </div>
      </Link>
    )
}

export default Card