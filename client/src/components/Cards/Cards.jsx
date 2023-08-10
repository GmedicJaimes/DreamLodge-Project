
import Card from "./Card/Card";
  import React, { useEffect, useState } from 'react';
  import styles from "./Cards.module.css";
  import { useInfiniteQuery } from "@tanstack/react-query";
  import { getPropertiesList } from "../../config/handlers";
  
  const Cards = () => {
    const [propertiesList, setPropertiesList] = useState([]);
    // console.log(propertiesList);
  
    useEffect(() => {

      async function fetchProperties() {
        const properties = await getPropertiesList(); 
        setPropertiesList(properties); // Actualizar el estado con los datos obtenidos
        // console.log(properties)
      }
      fetchProperties();
    }, []);
  
    return (
      <div className={styles.containerCards}>
        {propertiesList?.map((property) => (
          <Card property={property} key={property.id} />
        ))}
      </div>
    );
  };
  
  export default Cards;
  