import React from "react";
import styles from "./Paginate.module.css";

export const Paginate = ({ cardsPerPage, allCards, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginateCtn}>
      <ul className={styles.ulChris}>
        {pageNumbers.map((number) => (
          <li className={styles.liChris}
            onClick={() => paginate(number)}
            key={number}
            style={{
              backgroundColor:
                currentPage === number ? "#CD5A3E" : "initial",
                color:
                currentPage === number ? "#EADCCF" : "#CD5A3E",

                
             
            }}
          >
            <a className={styles.paginateAnchor}>{number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
