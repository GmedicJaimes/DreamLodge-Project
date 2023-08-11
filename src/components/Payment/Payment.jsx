import React, { useState } from 'react';
import { createMercadoPagoPayment } from '../../config/mercadopago'; 

const PaymentComponent = () => {
  const [paymentLink, setPaymentLink] = useState(null);

  const handlePayment = async () => {
    try {
 
      const link = await createMercadoPagoPayment(1000);
      setPaymentLink(link);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {paymentLink ? (
        <a href={paymentLink} target="_blank" rel="noopener noreferrer">
          Pagar en Mercado Pago
        </a>
      ) : (
        <button onClick={handlePayment}>Iniciar Pago</button>
      )}
    </div>
  );
};

export default PaymentComponent;
