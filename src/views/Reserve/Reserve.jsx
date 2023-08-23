import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import style from './Reserve.module.css'
import About from "../../components/About/About"
const Reserve = () => {
  const { subTotal, propertyId, selectedDays, propertyName } = useParams();
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-b1609369-11aa-4417-ac56-d07ef28cfcff");

  const createPreference = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/createorder`, {
        description: `${propertyName}`,
        price: `${subTotal}`,
        quantity: `${selectedDays}`,
        currency_id: "ARS",
        propertyId: propertyId,
        userId: auth.currentUser.uid,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleReserveClick = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className={style.ticketContainer}>
      <div></div>
      <div className={style.ticket}>
        <h2>Payment Details</h2>
        <div className={style.ticketDetail}>
          <div className={style.detail}>
            <span>Property Name:</span>
            <span>{propertyName}</span>
          </div>
          <div className={style.detail}>
            <span>Subtotal:</span>
            <span>${subTotal}</span>
          </div>
          <div className={style.detail}>
            <span>Selected Days:</span>
            <span>{selectedDays}</span>
          </div>
        </div>
        <button onClick={handleReserveClick}>Reserve Now</button>
        
        {preferenceId ? 
          <div className={style.walletContainer}>
            <Wallet initialization={{ preferenceId: preferenceId }} />
          </div>
          :
          <div className={style.walletContainer}>
            Click above to confirm
          </div>
          }
      </div>
      <About></About>
    </div>
  );
};

export default Reserve;
