import Card from "./Card/Card";
import React, { useEffect, useState } from "react";
import styles from "./Cards.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";

import Calendar from "../Calendar/Calendar"


const Cards = ({ host, currentPage, SetCurrentPage }) => {
  const cardsPerPage = 6; 
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexfOfFirstCard = indexOfLastCard - cardsPerPage;

  // Function to change the current page
  const paginate = (pageNumber) => {
    SetCurrentPage(pageNumber);
  };

  const handleSort = (option) => {
    SetCurrentPage(1); // Reinicia la página actual después de ordenar
  };

  // const currentCards = allCards.slice(indexfOfFirstCard, indexOfLastCard);
  const currentCards = host.slice(indexfOfFirstCard, indexOfLastCard);

  // const resetCurrentPage = () => {
  //   SetCurrentPage(1);
  // };




  return (
    <div className={styles.containerCards}>


        
    
<div className={styles.containerTop}>
{Array.isArray(currentCards) && 
  currentCards.map((property) => (
    <Card property={property} key={property.id} />
  ))
}


      </div>
 

    
     
    </div>
  );
};

export default Cards;
