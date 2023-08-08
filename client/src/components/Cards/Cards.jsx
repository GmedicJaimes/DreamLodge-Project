
import Card from "./Card/Card"
import React from 'react';
// import { useState, useEffect, useRef } from "react";
import styles from "./Cards.module.css"
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPropertiesList } from "../../config/handlers";




const Cards = () => {

    return(
      <div className={styles.containerCards}>
        {
              getPropertiesList?.map((property)=> (
                  <Card property={property} key={property.id}/>
              ))
          }
      </div>
    )
}

export default Cards;