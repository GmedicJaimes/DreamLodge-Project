import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";


const SearchBar = () => {

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  function handleChange(event) {
    event.preventDefault()
    const value = event.target.value;
    setSearchValue(value)
  }


  return (
    <div className={styles.searchContainer}>
      <input type="text" className={styles.inputSearch} placeholder="Buscar..." value={searchValue} onChange={handleChange} />
      <span className={styles.searchIcon}>
        <FontAwesomeIcon icon={faSearch} onClick={handleSubmit} />
      </span>
      {/* {filteredProperties.map((property) => (
        <div key={property.id}>{property.name}</div>
      ))} */}
    </div>
  );
}



export default SearchBar;
