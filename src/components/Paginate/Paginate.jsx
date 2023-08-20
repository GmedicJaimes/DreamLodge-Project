import React from "react";
import style from "./Paginate.module.css";

export const Paginate = ({ cardsPerPage, allCards, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.paginateCtn}>
      <ul>
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            style={{
              backgroundColor:
                currentPage === number ? "#CD5A3E" : "initial",
                color:
                currentPage === number ? "#EADCCF" : "#CD5A3E",

                
             
            }}
          >
            <a className={style.paginateAnchor}>{number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
