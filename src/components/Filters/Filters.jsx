import { getPropertiesByMultipleTypes, filterByStateAndCity, sortPropertiesByPrice } from "../../config/handlers";
import styles from "./Filters.module.css"
import React, { useState, useEffect } from 'react';
import { US_STATE_CITIES } from "../../views/Post/infoLocation";


const Filters = ({ setHost, originalHost, handleSortByPrice, ascending }) => {
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const availableStates = Object.keys(US_STATE_CITIES);  // Lista de states y cities disponibles
    const [selectedTypes, setSelectedTypes] = useState([]); // Estado para types seleccionados 

    useEffect(() => {
        applyFilters();  // Llama a la función applyFilters para aplicar los filtros y actualizar las propiedades mostradas 
      }, [selectedState, selectedCity, selectedTypes]); //se ejecuta cada vez que cambia selectedState, selectedCity o selectedTypes
    
      // Función para manejar la selección de un state
    const handleStateSelect = (state) => {
        setSelectedState(state);
        setSelectedCity(null); // Limpia la city seleccionada cuando se selecciona un nuevo state
      };
    
      // Función para manejar la selección de una city
      const handleCitySelect = (city) => {
        setSelectedCity(city);
      };
      
      // Función para alternar los tipos seleccionados
      const toggleType = (type) => {
         // Comprueba si el type ya está en la lista de types seleccionados
        if (selectedTypes.includes(type)) {
          // Si el type está en la lista, lo elimina de la lista de types seleccionados
          setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
        } else {
           // Si el type no está en la lista, agrega el tipo a la lista de types seleccionados
          setSelectedTypes([...selectedTypes, type]);
        }
      };

  
     // Función para aplicar los filtros seleccionados
    const applyFilters = async () => {
        let filteredProperties = [...originalHost];
    
        // Filtrar por estado y ciudad si se seleccionó un state
        if (selectedState) {
          filteredProperties = await filterByStateAndCity(selectedState, selectedCity);
        }
    
         // Filtrar por tipos de propiedad seleccionados
        if (selectedTypes.length > 0) {
          filteredProperties = filteredProperties.filter((property) =>
            selectedTypes.every((type) => property.type.includes(type))
          );
        }
    
         // Actualiza las propiedades mostradas con las propiedades filtradas
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