import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import React from 'react';

const Card = ({ property }) => {
  const { id, name, price, location} = property;

   if (!id) {
    // Si el ID es undefined, puedes manejarlo de alguna manera
    return <div>No se puede cargar la tarjeta sin un ID</div>;
  }
  return (
    <Link to={`/rooms/${id}`} className={styles.link}>
      <div className={styles.containerCard}>
        <div className={styles.image}>
        {
        property.imageUrl && (
            <div className={styles.image}>
              <img src={property.imageUrl} alt={name} />
            </div>
          )
        }
        </div>
        <div className={styles.info}>
          <h3>{location.state}, {location.city}</h3>
          <p className={styles.infoName}>{name}</p>
          <p className={styles.infoPrice}>$ {price} USD noche</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
