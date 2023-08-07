
import Card from "./Card/Card"
import React from 'react';
// import { useState, useEffect, useRef } from "react";
import styles from "./Cards.module.css"
import { useInfiniteQuery } from "@tanstack/react-query";


const Cards = ({allProperties}) => {

    useInfiniteQuery(
      ['property'],
      () => {}
    )


    return(
      <div className={styles.containerCards}>
          {
              allProperties?.map((property)=> (
                  <Card property={property} key={property.id}/>
              ))
          }
      </div>
    )
}

export default Cards;