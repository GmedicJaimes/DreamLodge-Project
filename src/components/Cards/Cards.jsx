import Card from "./Card/Card";
import React, { useEffect, useState } from "react";
import styles from "./Cards.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";

import Calendar from "../Calendar/Calendar"


const Cards = ({ host, currentPage }) => {

  const cardsPerPage = 6; 
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexfOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = host.slice(indexfOfFirstCard, indexOfLastCard);



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
