import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import React from 'react';
import landingImg from '../../../assets/landingImg.jpeg';
import FondoLanding from '../../../assets/FondoLanding.jpg';
import imagen1 from '../../../assets/imagen1.jpeg';
import imagen2 from '../../../assets/imagen2.jpeg';
import imagen3 from '../../../assets/imagen3.jpeg';
import imagen4 from '../../../assets/imagen4.jpeg';

const Card = ({ property }) => {
  const { id, name, rooms, location,price, userId, imageUrl } = property;

  const imageUrls = [landingImg, FondoLanding, imagen1, imagen2, imagen3, imagen4];
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const randomImageUrl = imageUrls[randomIndex];


  return (
    <Link to={`/rooms/${id}`} className={styles.link}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={randomImageUrl} alt="pic of the house" />
        </div>
        <section className={styles.info}>
          <h3>{location?.state}, {location?.city}</h3> 
          <p className={styles.infoName}>{name}</p>
          <p className={styles.infoPrice}>$ {price} USD noche</p>
        </section>
      </div>
    </Link>
  );
}

export default Card;
