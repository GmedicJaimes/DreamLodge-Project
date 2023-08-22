import React, { useEffect } from "react";
import styles from "./Paginate.module.css";



const Paginate = ({ cardsPerPage, totalCards, paginate, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  };
  // useEffect(()=>{
  //   const update = ()=>{
  //     latPage = Math.ceil(totalCards/cardsPerPage);
  //     if(currentPage > lastPage){
  //       setCurrentPage(lastPage)
  //     }
  //   }
  // }, [totalCards, cardsPerPage, currentPage])

  return (
    <div className={styles.paginateCtn}>
      <ul className={styles.ulChris}>
        {pageNumbers.map((number) => (
          <li
            className={styles.liChris}
            onClick={() => paginate(number)}
            key={number}
            style={{
              backgroundColor: currentPage === number ? "#CD5A3E" : "initial",
              color: currentPage === number ? "#EADCCF" : "#CD5A3E",
            }}
          >
            <a className={styles.paginateAnchor}>{number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginate;
