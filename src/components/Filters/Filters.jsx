import { getPropertiesByType, filterByStateAndCity } from "../../config/handlers";
import styles from "./Filters.module.css"
import React, { useState } from 'react';
import { US_STATE_CITIES } from "../../views/Post/infoLocation";


const Filters = ({ setHost, originalHost, handleSortByPrice, ascending }) => {
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const availableStates = Object.keys(US_STATE_CITIES);

    const handleStateSelect = async (state) => {
        setSelectedState(state);

        if (selectedCity) {
            setSelectedCity(null);
        }

        if (state) {
            const properties = await filterByStateAndCity(state, null);
            setHost(properties);
        } else {
            setHost(originalHost);
        }
    };

    const handleCitySelect = async (city) => {
        setSelectedCity(city);

        if (city) {
            const properties = await filterByStateAndCity(selectedState, city);
            setHost(properties);
        } else {
            const propertiesInSelectedState = await filterByStateAndCity(selectedState, null);
            setHost(propertiesInSelectedState);
        }
    };



    const handlerClick = async (type) => {
        try {
            const response = await getPropertiesByType(type);
            console.log(response)
            setHost(response)

        } catch (error) {
            console.log(error);
        }
    }


    const cleanFilter = () => {
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
                <button onClick={() => handlerClick("Cabins")}  > <img src="https://cdn-icons-png.flaticon.com/128/4614/4614488.png" />Cabins</button>
                <img />
                <button onClick={() => handlerClick("Beachfront")}  > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/8404/8404761.png" />Beachfront</button>
                <img />
                <button onClick={() => handlerClick("Mansion")} > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/5904/5904415.png" />Mansions</button>
                <img />
                <button onClick={() => handlerClick("Countryside")} > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/7276/7276711.png" />Countryside</button>
                <img />
                <button onClick={() => handlerClick("Room")} > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/566/566589.png" />Rooms</button>
                <button onClick={handleSortByPrice}>Ordenar por precio {ascending ? 'ascendente' : 'descendente'} </button>
                <button onClick={cleanFilter}>Clean</button>
            </div>
        </div>
    )
}

export default Filters