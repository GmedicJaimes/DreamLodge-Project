/* import Card from "./Card/Card";
import React, { useEffect, useState } from 'react';
import styles from "./Cards.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPropertiesList } from "../../firebase/handlers.js";

const Cards = () => {
  const [propertiesList, setPropertiesList] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      const properties = await getPropertiesList(); // Esperar a que se resuelva la promesa
      setPropertiesList(properties); // Actualizar el estado con los datos obtenidos
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
 */

import Card from "./Card/Card";
  import React, { useEffect, useState } from 'react';
  import styles from "./Cards.module.css";
  import { useInfiniteQuery } from "@tanstack/react-query";
  import { getPropertiesList } from "../../config/handlers.js";
  
  const Cards = () => {
    const [propertiesList, setPropertiesList] = useState([]);

  
    useEffect(() => {

      async function fetchProperties() {
        const properties = await getPropertiesList(); // Esperar a que se resuelva la promesa
        setPropertiesList(properties); // Actualizar el estado con los datos obtenidos
        console.log(properties)
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
  