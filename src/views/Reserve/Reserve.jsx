import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import style from './Reserve.module.css'
const Reserve = () => {
  const { subTotal, selectedDays, propertyName } = useParams();
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-b1609369-11aa-4417-ac56-d07ef28cfcff");

  const createPreference = async () => {
    try {
      const response = await axios.post(`https://apimercadopago.onrender.com/createorder`, {
        description: `${propertyName}`,
        price: `${subTotal}`,
        quantity: `${selectedDays}`,
        currency_id: "ARS",
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
        <button onClick={handleReserveClick} className={style.btnReserveNow}>Reserve Now</button>
      </div>
      {preferenceId && (
        <div className={style.walletContainer}>
          <Wallet initialization={{ preferenceId: preferenceId }} />
        </div>
      )}
    </div>
  );
};

export default Reserve;
