
import Card from "./Card/Card"
import React from 'react';
import { useState, useEffect, useRef } from "react";
import styles from "./Cards.module.css"

const Cards = ({allProperties}) => {



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