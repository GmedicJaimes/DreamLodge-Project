import Card from "./Card/Card";
import React, { useEffect, useState } from "react";
import styles from "./Cards.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Paginate } from "../Paginate/Paginate";

const Cards = ({ host, currentPage, SetCurrentPage }) => {
  const allCards = host;

  // State for the current page, initial value is 1
  // const [currentPage, SetCurrentPage] = useState(1);

  // State for the number of countries per page, initial value is 10
  const [cardsPerPage, SetCardsPerPage] = useState(6);

  // Calculate the index of the last country on the current page
  const indexOfLastCard = currentPage * cardsPerPage;


  // Calculate the index of the first country on the current page
  const indexfOfFirstCard = indexOfLastCard - cardsPerPage;

  // Function to change the current page
  const paginate = (pageNumber) => {
    SetCurrentPage(pageNumber);
  };

  const handleSort = (option) => {
    dispatch(SORT(option));
    SetCurrentPage(1); // Reinicia la página actual después de ordenar
  };

  const currentCards = allCards.slice(indexfOfFirstCard, indexOfLastCard);

  return (
    <div className={styles.containerCards}>

<div className={styles.containerTop}>
{Array.isArray(currentCards) && currentCards.length > 0 ? (
  currentCards.map((property) => (
    <Card property={property} key={property.id} />
  ))
) : (
  <div className={styles.sorryP}>Sorry, no properties are available with those search criteria. </div>
)}
      </div>
      <div className={styles.containerBottom}>
        <Paginate
          cardsPerPage={cardsPerPage} // Number of countries per page
          allCards={allCards.length} // Total number of countries or searched countries
          paginate={paginate} // Function to change the page
          currentPage={currentPage} // Current page number
        />
      </div>
     
      
     
    </div>
  );
};

export default Cards;

// const Cards = ({ host }) => {
//   return (
//     <div className={styles.containerCards}>
//       {Array.isArray(host) &&
//         host.map((property) => (
//           !property.delete && <Card property={property} key={property.id} />
//         ))}
//     </div>
//   );
// };

// export default Cards;