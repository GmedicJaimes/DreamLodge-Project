import { getPropertiesByType } from "../../config/handlers";
import styles from "./Filters.module.css"
import React, { useState } from 'react';


const Filters = ({ setHost, originalHost, handleSortByPrice, ascending}) => {

    const [type, setType] = useState('')

    const handleChange = async (e) => {
        try {
            const {value} = e.target;
            setType(value)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handlerClick = async (type) => {
        try { 
            const response =  await getPropertiesByType(type);
            console.log(response)
             setHost(response)
            
        } catch (error) {
            console.log(error);   
        }
    }

    const cleanFilter = () => {
        setHost(originalHost);
        setType('');
      };

    return(
        <div className={styles.containerFilter}>
            <div className={styles.filter}>
                
                <button onClick={() => handlerClick("Cabins")}  > <img src="https://cdn-icons-png.flaticon.com/128/4614/4614488.png"/>Cabins</button>
                <img/>
                <button onClick={() => handlerClick("Beachfront")}  > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/8404/8404761.png"/>Beachfront</button>
                <img/>
                <button onClick={() => handlerClick("Mansion")} > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/5904/5904415.png"/>Mansions</button>
                <img/>
                <button onClick={() => handlerClick("Countryside")} > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/7276/7276711.png"/>Countryside</button>
                <img/>
                <button onClick={() => handlerClick("Room")} > <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/566/566589.png"/>Rooms</button>
                <button onClick={handleSortByPrice}>Ordenar por precio {ascending ? 'ascendente' : 'descendente'} </button>
                <button onClick={cleanFilter}>Clean</button>
            </div>
        </div>
    )
}

export default Filters