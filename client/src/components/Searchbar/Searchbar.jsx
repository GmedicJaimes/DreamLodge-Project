import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; 
import styles from "./SearchBar.module.css";
import { filterPropertiesByName } from "../../config/handlers";
import { usePropertiesList } from "../Filters/PropertiesContext";

const SearchBar = ({ onPropertiesFiltered }) => {
  const properties = usePropertiesList();// Obtiene la lista de propiedades usando el hook
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleSearch = () => {
    // Llama al handler para filtrar las propiedades por nombre
    const filteredProperties = filterPropertiesByName (properties, searchValue);
    onPropertiesFiltered(filteredProperties);

    if (filteredProperties.length === 0) {
      console.log("No se encontró ninguna propiedad.");
    }
    console.log("Propiedades filtradas:", filteredProperties);
  };

  
  return (
    <div className={styles.searchContainer}>
      <input type="text" className={styles.inputSearch} placeholder="Buscar..." value={searchValue} onChange={handleChange}   />
      <span className={styles.searchIcon}>
        <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
      </span>
    </div>
  );
}

export default SearchBar;
