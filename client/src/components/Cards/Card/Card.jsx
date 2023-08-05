import { Link } from "react-router-dom"
import styles from "./Card.module.css"
import React from 'react';



const Card = ({property}) => {
    const {name, price, location} = property
    return(
      <Link to={"/rooms"} className={styles.link}>
        <div className={styles.container}>
            <div className={styles.image}>
                <img src="" alt="casa"/>
            </div>
            <section className={styles.info}>
                <h1>{location}</h1>
                <p>$ {price} USD</p>
                <p>{name}</p>

                    
            </section>
        </div>
      </Link>
    )
}

export default Card