import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import React from 'react';

const Card = ({ property }) => {
  const { id, name, rooms, location,price, userId } = property;

  return (
    <Link to={`/rooms/${id}`} className={styles.link}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={property?.imageUrl} alt={name} />
        </div>
        <section className={styles.info}>
          {/* <h3>{location?.state}, {location?.city}</h3> */}
          {/* <h3>{location}</h3> */}
          {/* <p>{id}</p>
          <p>{userId}</p> */}
          <p className={styles.infoName}>{name}</p>
          <p className={styles.infoPrice}>$ {price} USD noche</p>
        </section>
      </div>
    </Link>
  );
}

export default Card;
