
import Card from "./Card/Card";
  import React, { useEffect, useState } from 'react';
  import styles from "./Cards.module.css";
  import { useInfiniteQuery } from "@tanstack/react-query";

  
  const Cards = ({host}) => {

    // const [propertiesList, setPropertiesList] = useState([]);
    // console.log(propertiesList);
  
    // useEffect(() => {

    //   async function fetchProperties() {
    //     const properties = await getPropertiesList(); 
    //     setPropertiesList(properties); // Actualizar el estado con los datos obtenidos
    //     // console.log(properties)
    //   }
    //   fetchProperties();
    // }, []);
    //   async function fetchProperties() {
    //     const properties = await getPropertiesList(); 
    //     console.log(properties)// Esperar a que se resuelva la promesa
    //     setPropertiesList(properties); // Actualizar el estado con los datos obtenidos
    //     // console.log(properties)
    //   }
    //   fetchProperties();
    // }, []);
  
    return (
      <div className={styles.containerCards}>
        {host?.map((property) => (
          <Card property={property} key={property.id} />
        ))}
      </div>
    );
  };
  
  export default Cards;
  