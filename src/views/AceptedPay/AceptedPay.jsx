
import styles from "./AceptedPay.module.css"
import React from 'react';
import { Link } from "react-router-dom"
import About from "../../components/About/About"
import { getUserByUID, registerPurchases } from "../../config/handlers";

import { updateAvaible} from '../../config/handlers';
import { auth } from "../../config/firebase";

const AceptedPay = () => {

    const [ dataRecipe, setDataRecipe ] = React.useState({})
    const [ userData, setUserData ] = React.useState()
    const [ ticketInfo, setTicketInfo ] = React.useState({})

    React.useEffect( () => {

        const defineRecipe = async () => {
        const savedRecipe = localStorage.getItem("propertyData")

        const infoRecipe = localStorage.getItem("dataTicket")
        
        if (savedRecipe || infoRecipe) {
            const parsedRecipe = JSON.parse(savedRecipe)
            
            const parsedInfo = JSON.parse(infoRecipe)
            setTicketInfo(parsedInfo)

            setDataRecipe(parsedRecipe)
            const idOwner = parsedRecipe.property.userId

            const user = await getUserByUID(idOwner)
            // console.log(user);
            setUserData(user);
            // console.log(parsedRecipe.property.uui)

            await updateAvaible(parsedRecipe.propertyId, parsedRecipe.idTicket)
            await registerPurchases(auth.currentUser.uid, parsedRecipe.propertyId)
        };}
        defineRecipe()
    }, []);

    
    return(
        <div>
            <div className={styles.containerPrev}>
                <div className={styles.container}>
                    <header className={styles.successPay}>PAYMENT DONE!</header>
                    <p className={styles.ticketP}>Contact your host to schedule your stay at the lodging</p>
                    <div className={styles.recipeNuser}>
                        <div className={styles.cardHost}>
                            <img className={styles.imageTicket} src={userData?.image} alt={userData?.name} />
                            <p>{userData?.name} {userData?.lastName}</p>
                            <Link to={`/user/${userData?.uid}`}>
                                <button className={styles.btnContact}>Contact Owner</button>
                            </Link>
                        </div>
                        <div className={styles.cardTicket}>
                            <h1>Recipe</h1>
                            <p>-----------------------------</p>
                            <p>Location: {dataRecipe?.propertyTicket?.name}</p>
                            <p>Ticket: {ticketInfo?.dataTicket?.idTicket}</p>
                            <p>Total Days {ticketInfo?.dataTicket?.daysTicket}</p>
                            <p>-----------------------------</p>
                            <h2>Total price: {ticketInfo?.dataTicket?.totalTicket}$USD</h2>
                        </div>
                    </div>
                </div>
            </div>
            <About/>
        </div>
    )
}

export default AceptedPay