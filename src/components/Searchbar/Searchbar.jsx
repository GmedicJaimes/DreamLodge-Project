import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; 
import styles from "./SearchBar.module.css";

const SearchBar = ({ value, handleChange, handleSubmit }) => {
 
  return (
    <div className={styles.searchContainer}>
      <input type="text" className={styles.inputSearch} placeholder="Buscar..." value={value}
          onChange={handleChange} />
      <span className={styles.searchIcon}>
        <FontAwesomeIcon icon={faSearch}  onClick={handleSubmit}/>
      </span>
    </div>
  );
}

export default SearchBar;
