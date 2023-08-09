import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
          
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

initMercadoPago('YOUR_PUBLIC_KEY');

const Reserve = () => {
 

  return (
    <div>

    </div>
  )
    
};

export default Reserve;
