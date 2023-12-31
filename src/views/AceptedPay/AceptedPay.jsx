import styles from "./AceptedPay.module.css";
import React from "react";
import { Link } from "react-router-dom";
import About from "../../components/About/About";
import { getUserByUID, registerPurchases } from "../../config/handlers";

import { updateAvaible } from "../../config/handlers";
import { auth } from "../../config/firebase";

const AceptedPay = () => {
  const [dataRecipe, setDataRecipe] = React.useState("");
  const [userData, setUserData] = React.useState();
  const [ticketInfo, setTicketInfo] = React.useState("");
  const [totalTicket, setTotalTicket] = React.useState("");

  React.useEffect(() => {
    const defineRecipe = async () => {
      const savedRecipe = localStorage.getItem("daysTicket");
      const propertyJ = localStorage.getItem("propertyData");
      const infoRecipe = localStorage.getItem("ticketMp");
      const subTotalJ = localStorage.getItem("subTotal");

      if (savedRecipe || infoRecipe || subTotalJ || propertyJ) {
        const parsedRecipe = JSON.parse(savedRecipe);
        const subTotal = JSON.parse(subTotalJ);
        const parsedInfo = JSON.parse(infoRecipe);
        const property = JSON.parse(propertyJ);

        setTicketInfo(parsedInfo);
        setTotalTicket(subTotal)
        setDataRecipe(parsedRecipe);
        console.log(property)

        const idOwner = property?.property?.userId;

        const user = await getUserByUID(idOwner);
        // console.log(user);
        setUserData(user);
        // console.log(parsedRecipe.property.uui)

        // await updateAvaible(parsedRecipe.propertyId, parsedRecipe.idTicket);
        await registerPurchases(auth.currentUser.uid, property.propertyId, totalTicket);
      }
    };
    defineRecipe();
  }, []);

  return (
    <div>
      <div className={styles.containerPrev}>
        <div className={styles.containerPay}>
          <header className={styles.successPay}>PAYMENT DONE!</header>
          <h4 className={styles.ticketP}>
            Contact your host to schedule your stay at the lodging
          </h4>
          <div className={styles.recipeNuser}>
            <div className={styles.cardHost}>
              <img
                className={styles.imageTicket}
                src={userData?.image}
                alt={userData?.name}
              />
              <p>
                {userData?.name} {userData?.lastName}
              </p>
              <Link to={`/user/${userData?.uid}`}>
                <button className={styles.btnContact}>Contact Owner</button>
              </Link>
            </div>
            <div className={styles.cardTicket}>
              <h1>Recipe</h1>
              <span>-------------------------------------------------</span>
              <p>Location: {dataRecipe?.propertyTicket?.name}</p>
              <p>Ticket: {ticketInfo}</p>
              <p>Total Days {dataRecipe}</p>
              <span>-------------------------------------------------</span>
              <h2>Total price: {totalTicket}$USD</h2>
            </div>
          </div>
        </div>
      </div>
      <About />
    </div>
  );
};

export default AceptedPay;
