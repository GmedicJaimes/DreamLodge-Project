import styles from "./Filters.module.css"
import React from 'react';


const Filters = () => {

    return(
        <div className={styles.containerFilter}>
            <div className={styles.filter}>
                
                <button> <img src="https://cdn-icons-png.flaticon.com/128/4614/4614488.png"/>Cabins</button>
                <img/>
                <button> <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/8404/8404761.png"/>Beachfront</button>
                <img/>
                <button> <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/5904/5904415.png"/>Mansions</button>
                <img/>
                <button> <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/7276/7276711.png"/>Countryside</button>
                <img/>
                <button> <img rel="shortcut icon" src="https://cdn-icons-png.flaticon.com/128/566/566589.png"/>Rooms</button>
            </div>
        </div>
    )
}

export default Filters