import styles from "./AceptedPay.module.css"
import React from 'react';
import { Link } from "react-router-dom"
import About from "../../components/About/About"
import { getUserByUID } from "../../config/handlers";

import {getPaymentStatus, updateAvaible} from '../../config/handlers';

const AceptedPay = () => {

    const [ dataRecipe, setDataRecipe ] = React.useState({})
    const [ userData, setUserData ] = React.useState()

    React.useEffect( async () => {
        const savedRecipe = localStorage.getItem("propertyData")
        if (savedRecipe) {
            const parsedRecipe = JSON.parse(savedRecipe)
            setDataRecipe(parsedRecipe)
            const user = await getUserByUID(parsedRecipe.property.userId)
            setUserData(user);
            console.log(parsedRecipe.property.uui)

            await updateAvaible(parsedRecipe.propertyId, parsedRecipe.idTicket)
        };
    }, [])

    return(
        <div>
            <div>
                <div className={styles.container}>
                    <header>PAYMENT DONE!</header>
                    <p>Contact your host to schedule your stay at the lodging</p>
                    <div className={styles.recipeNuser}>
                        <div className={styles.cardHost}>
                            <img src={userData?.image} alt={userData?.name} />
                            <p>{userData?.name}</p>
                            <Link to={`/user/${userData?.uid}`}>
                                <button>contactar</button>
                            </Link>
                        </div>
                        <div className={styles.cardHost}>
                            <h1>Recipe</h1>
                            <p>{dataRecipe?.property?.name}</p>
                            <p>Ticket: {dataRecipe.idTicket}</p>
                            <p>Selected Days {dataRecipe.selectedDays}</p>
                            <h2>Total price: {dataRecipe.totalPrice}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <About/>
        </div>
    )
}

export default AceptedPay