import styles from "./DetailPost.module.css";
import React, { useState, useEffect } from "react";
import About from "../../../components/About/About";
import guest from "../../../assets/gente-junta.png"
import door from "../../../assets/puerta.png"
import bed from "../../../assets/cama.png"
import bathroomicon from "../../../assets/bano-publico.png"

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

import { useParams, Link } from "react-router-dom";
import { detailId } from "../../../config/handlers";

import {getPaymentStatus, updateAvaible} from '../../../config/handlers'

const DetailPost = () => {
  const { id } = useParams();
  const [property, setPropertyDetail] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  // NEXT IMAGE =======================================

  const nextImage = () => {
    setActiveImage((prevState) => (prevState + 1) % property?.imageUrl?.length);
  };
  // PREV IMAGE =======================================

  const prevImage = () => {
    setActiveImage(
      (prevState) =>
        (prevState - 1 + property?.imageUrl?.length) %
        property?.imageUrl?.length
    );
  };

  // CONFIGURACION DEL PAGO=======================================
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-b1609369-11aa-4417-ac56-d07ef28cfcff");
  const createPreference = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/createorder`, {
        description: `${property.name}`,
        price: `${totalPrice}`,
        quantity: `${selectedDays}`,
        currency_id: "ARS",
      });

      const { id } = response.data;

      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const [idTicket, setIdTicket] = React.useState(0);

    const handleBuy = async()=>{
        const id = await createPreference();
        //si la preferencia nos devuelve un id, seteamos el estado local para renderizar el boton
        if (id){
            setPreferenceId(id);
            setIdTicket(id);
            //ademas, comienza el intervalo loopeado y la locomotora del sabor del dinero, esperando que MP nos de una respuesta del pago;
            try {
                await new Promise((resolve)=>{
                    const intervalPay = setInterval(async()=>{
                    const paymentStatus = await getPaymentStatus(id);
                    if(paymentStatus === 'approved'){
                        //si el pago fue aprovado se actualiza el avaible de "true" a "false"
                        updateAvaible(property.id, preferenceId);
                        //cortamos el problema y resolvemos la promesa
                        clearInterval(intervalPay)
                        resolve()
                    }else if(paymentStatus === 'rejected'){
                        //si el pago es rechazado, se corda el intervalo sin actualizar
                        clearInterval(intervalPay);
                        resolve()
                    }
                    })
                }, 10000)
            } catch (error) {
                console.error("Error en la obtencion del status de pago", error);
            }
        };
    };

      React.useEffect(() => {
        localStorage.setItem('propertyData', JSON.stringify({
            idTicket: idTicket,
            property: property,
            selectedDays: selectedDays,
            totalPrice: totalPrice,
            propertyId: id
        }));
      }, [property]);
  

  //CALCULAR EL PRECIO p/dias========================================
  const [selectedDays, setSelectedDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleCalculatePrice = () => {
    const pricePerDay = property.price;
    const calculatedPrice = selectedDays * pricePerDay;
    setTotalPrice(calculatedPrice);
  }; //CALCULAR EL PRECIO
  //=============================================================
  //

  useEffect(() => {
    const propertiesDetail = async () => {
      const detailPost = await detailId(id);
      setPropertyDetail(detailPost);
      console.log(property);
    };
    propertiesDetail();
  }, []);

  return (
    <div>
      <div className={styles.bigContainerDetail}>
        <header>
          <section>
            <h1 className={styles.tittleD}>{property?.name}</h1>
            <h5 className={styles.locationD}>{property?.location?.city}, {property?.location?.state}</h5>
          </section>
          <section>
            <div className={styles.priceDiv}>{property?.price} USD/night</div>
            <p><a href="#pie">Reserve here</a></p>
            <div>

            </div>
          </section>
        </header>
        <section className={styles.imageRelative}>
        <button onClick={prevImage} className={styles.prevButton}>←</button>
        <img
              src={property?.imageUrl && property.imageUrl[activeImage]}
              alt={property?.imageUrl}
              className={styles.imageCarrousel}
            />
            <button onClick={nextImage} className={styles.nextButton}>→</button>
        </section>
        <div className={styles.falseLine}></div>
        <section className={styles.overviewRating}>
            <section className={styles.overviewBox}>
                <h3>Overview</h3>
                <p>{property?.description}</p>
            </section>
            <section>
              <h3>Rating</h3>
              <div className={styles.ratingBox}><p>4,2</p></div>
            </section>
        </section>
        <div className={styles.falseLine}></div>
        <section className={styles.roomsService}>
          <section className={styles.roomsD}>
              <h3>Rooms</h3>
              <ul>
                <li><img src={guest}/> Capacity: {property?.stances?.guest}</li>
                <li><img src={door}/> Room(s): {property?.stances?.rooms}</li>
                <li><img src={bed}/> Bed(s): {property?.stances?.beds}</li>
                <li><img src={bathroomicon}/> Bathroom(s): {property?.stances?.bathrooms}</li>
              </ul>
          </section>
          <section className={styles.servicesD}>
              <h3>Services</h3>
              <div>
                <ul>
                  {
                    property?.services?.map((serviceItem) => {
                      return <li key={serviceItem}>{serviceItem}</li>
                    })
                  }
                </ul>
              </div>
          </section>
        </section>
        <div className={styles.falseLine}></div>
        <section id="pie" className={styles.paymentBox}>
          <section>
            <div className={styles.priceDiv}>{property?.price} USD/night</div>
            {totalPrice > 0 && <div className={styles.priceDiv}>Total to pay: $ {totalPrice}</div>}
            <div className={styles.reservebtn} onClick={handleBuy}>Reserve</div>
          </section>
          <div>
            <h3>Select the number of reservation days:</h3>
            <input
              className={styles.reservationDays}
              type="number"
              min="1"
              value={selectedDays}
              onChange={(e) => setSelectedDays(Number(e.target.value))}
            />
            <button className={styles.otroBoton} onClick={handleCalculatePrice}>Calculate Price</button>
            {preferenceId && (
              <Wallet initialization={{ preferenceId: preferenceId }} />
            )}
          </div>
        </section>
      </div>
      <About></About>
    </div>
  );
};

export default DetailPost;
