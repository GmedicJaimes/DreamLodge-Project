import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  
  return (
    <div className={styles.searchContainer}>
      <input type="text" className={styles.inputSearch} placeholder="Buscar..."    />
      <span className={styles.searchIcon}>
        <FontAwesomeIcon icon={faSearch}  />
      </span>
    </div>
  );
}



export default SearchBar;
