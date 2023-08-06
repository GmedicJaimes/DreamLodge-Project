
import Card from "./Card/Card"
import React from 'react';
import { useState, useEffect, useRef } from "react";
import styles from "./Cards.module.css"

const Cards = ({allProperties}) => {


  const allCards = [...allProperties]; 
  // console.log(allCards);// Aquí debes poner tus datos reales

  const [visibleCards, setVisibleCards] = useState([]);

  console.log(visibleCards)
  const cardsPerPage = 8;

  const containerRef = useRef(null);

  // Función para cargar más tarjetas cuando sea necesario
  const loadMoreCards = () => {
    const startIndex = visibleCards.length;
    const endIndex = startIndex + cardsPerPage;
    const newVisibleCards = allCards.slice(startIndex, endIndex);

    setVisibleCards((prevCards) => [...prevCards, ...newVisibleCards]);
  };

  // Función para detectar el evento de scroll
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollHeight, clientHeight } = container;
      const isBottom =  clientHeight - scrollHeight <= 200;

      if (isBottom) {
        loadMoreCards();
      }
    }
  };

  // Agregar el evento de scroll al montar el componente
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);


  // console.log(visibleCards)
  // Renderizar todas las tarjetas visibles
  return (
    <div ref={containerRef} className={styles.containerCards}>
      {
      visibleCards.map((card) => (
        <Card
          key={card.id}
          card={card}
        />
      ))}
  </div>
  )


    // return(
    //     <div className={styles.containerCards}>
    //         {
    //             allProperties?.map((property)=> (
    //                 <Card property={property} key={property.id}/>
    //             ))
    //         }
    //     </div>
    // )
}

export default Cards;