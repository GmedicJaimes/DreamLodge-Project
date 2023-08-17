import { getPropertiesByMultipleTypes, filterByStateAndCity, sortPropertiesByPrice } from "../../config/handlers";
import styles from "./Filters.module.css"
import React, { useState, useEffect } from 'react';
import { US_STATE_CITIES } from "../../views/Post/infoLocation";


const Filters = ({ setHost, originalHost, handleSortByPrice, ascending }) => {
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const availableStates = Object.keys(US_STATE_CITIES);
    const [selectedTypes, setSelectedTypes] = useState([]); // Estado para tipos seleccionados 

    useEffect(() => {
        applyFilters();
      }, [selectedState, selectedCity, selectedTypes]);
    



    const handleStateSelect = (state) => {
        setSelectedState(state);
        setSelectedCity(null);
      };
    
      const handleCitySelect = (city) => {
        setSelectedCity(city);
      };

      const toggleType = (type) => {
        if (selectedTypes.includes(type)) {
          setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
        } else {
          setSelectedTypes([...selectedTypes, type]);
        }
      };

  
    
    const applyFilters = async () => {
        let filteredProperties = [...originalHost];
    
        if (selectedState) {
          filteredProperties = await filterByStateAndCity(selectedState, selectedCity);
        }
    
        if (selectedTypes.length > 0) {
          filteredProperties = filteredProperties.filter((property) =>
            selectedTypes.every((type) => property.type.includes(type))
          );
        }
    
        setHost(filteredProperties);
      };

   

    const cleanFilter = () => {
        setSelectedState(null);
        setSelectedCity(null);
        setSelectedTypes([]);
        setHost(originalHost);
    };
    return (
        <div className={styles.containerFilter}>
            <div className={styles.filter}>
                {/* Selector de estado */}
                <select onChange={(e) => handleStateSelect(e.target.value)}>
                    <option value="All" disabled selected hidden>Seleccionar estado</option>
                    {availableStates.map((state) => (
                        <option value={state} key={state}>
                            {state}
                        </option>
                    ))}
                </select>  

                {/* Selector de ciudad */}
                 {selectedState && (
                    <select onChange={(e) => handleCitySelect(e.target.value)}>
                        <option value="All" disabled selected hidden>Seleccionar ciudad</option>
                        {US_STATE_CITIES[selectedState].map((city) => (
                            <option value={city} key={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                )}
                <button onClick={() => { toggleType("Cabins"); }}  > <img src="https://cdn-icons-png.flaticon.com/128/4614/4614488.png" />Cabins</button>
                <img />
                <button onClick={() => { toggleType("Beachfront");  }}  > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/8404/8404761.png" />Beachfront</button>
                <img />
                <button onClick={() => { toggleType("Mansion");  }} > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/5904/5904415.png" />Mansions</button>
                <img />
                <button onClick={() => { toggleType("Countryside");  }} > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/7276/7276711.png" />Countryside</button>
                <img />
                <button onClick={() => { toggleType("Room") }} > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/566/566589.png" />Rooms</button>
                {/* <button onClick={applyFilters}>Aplicar Filtros</button> */}
                <button onClick={handleSortByPrice}>Ordenar por precio {ascending ? 'ascendente' : 'descendente'} </button>
                <button onClick={cleanFilter}>Clean</button>
            </div>
        </div>
    )
}

export default Filters;