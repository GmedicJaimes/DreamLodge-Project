import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos del datepicker

// import { createMercadoPagoPayment } from '../../config/mercadopago'; 

const Reserve = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);

  const {id} = useParams()

//   useEffect(() => {
//     const fetchReservedDates = async () => {
//       const dates = await getReservedDatesForProperty(propertyId);
//       setReservedDates(dates);
//     };

//     fetchReservedDates();
//   }, [propertyId]);

//   const handleConfirmReserve = async () => {
//     try {
//       const link = await createMercadoPagoPayment(1000);
//       setPaymentLink(link);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  return (
    <div>
      <h2>Seleccione las fechas de reserva:</h2>
      <DatePicker
        // excludeDates={reservedDates}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
      {/* <button onClick={handleReservation}>
        Confirmar Reserva
      </button>
      {paymentLink && (
        <a href={paymentLink} target="_blank" rel="noopener noreferrer">
          Pagar en Mercado Pago
        </a>
      )} */}
      <br />
      <Link to={`/rooms/${id}`}>
        Volver a la propiedad
      </Link>
    </div>
  );
};

export default Reserve;
