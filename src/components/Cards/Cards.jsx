
import Card from "./Card/Card";
  import React, { useEffect, useState } from 'react';
  import styles from "./Cards.module.css";
  import { useInfiniteQuery } from "@tanstack/react-query";

  
  const Cards = ({host}) => {

  

    return (
      <div className={styles.containerCards}>
        {Array.isArray(host) && host.map((property) => (
          <Card property={property} key={property.id} />
        ))}
      </div>
    );
    
  };
  
  export default Cards;
  