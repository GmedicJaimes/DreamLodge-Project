import styles from "./DetailPost.module.css"
import React, { useState, useEffect } from 'react';
import About from "../../../components/About/About";
import guest from "../../../assets/gente-junta.png"
import door from "../../../assets/puerta.png"
import bed from "../../../assets/cama.png"
import bathroomicon from "../../../assets/bano-publico.png"

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'

import {useParams, Link } from "react-router-dom";
import { detailId } from "../../../config/handlers";

import {getPaymentStatus, updateAvaible} from '../../../config/handlers'
import { auth } from "../../../config/firebase";

const DetailPost = () => {
  const { id } = useParams();
  const [property, setPropertyDetail] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  //REVIEWS============================================

  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [hasPurchased, setHasPurchased] = useState(null);
  const submitReview = async (propertyId) => {
    try {
      await addDoc(collection(db, "reviews"), {
        propertyId: propertyId,
        author: reviewAuthor,
        content: reviewContent,
        rating: reviewRating,
      });
  
      // Limpia los campos del formulario después de enviar la reseña
      setReviewAuthor("");
      setReviewContent("");
      setReviewRating(0);
  
      alert("Reseña enviada con éxito");
    } catch (error) {
      console.log(error);
    }
  };
  // NEXT IMAGE =======================================


const DetailPost = () => {  
  const { id } = useParams()
  const [property, setPropertyDetail] = useState([])
  // console.log(property);
  // console.log(detailId)




  // CONFIGURACION DEL PAGO=======================================
  const[preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-b1609369-11aa-4417-ac56-d07ef28cfcff")
    const createPreference = async()=>{
        try {
            const response = await axios.post(`http://localhost:3001/createorder`, {
                description: `${property.name}`,
                price: `${totalPrice}`,
                quantity: `${selectedDays}`,
                currency_id: "ARS",
            });

            const { id } = response.data;

            return id
        } catch (error) {
            console.log(error)
        }
    }

    const [idTicket, setIdTicket] = React.useState(0)

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
            propertyId: id,
            buyerId: auth?.currentUser?.uid
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

  useEffect(async () => {
    const propertiesDetail = async () => {
      const detailPost = await detailId(id);
      setPropertyDetail(detailPost)

    }
    propertiesDetail();
  
    // obtener reseñas de la propiedad
    const reviewsSnapshot = await getDocs(
      query(collection(db, "reviews"), where("propertyId", "==", id))
    );
    const reviewsData = reviewsSnapshot.docs.map((reviewDoc) => reviewDoc.data());
  
    // si el usuario loggeado, compro la propiedad
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const purchasesQuery = query(collection(db, "purchases"), 
        where("userId", "==", userId),
        where("propertyId", "==", id)
      );
      const purchasesSnapshot = await getDocs(purchasesQuery);
      const hasPurchased = !purchasesSnapshot.empty;
  
      // modificamos el estado haspurchased

      setHasPurchased(hasPurchased);
    };
  }, []);
  

  return (
    <div>
      <div className={styles.bigContainerDetail}>
        <header>
          <section>
            <h1 className={styles.tittleD}>{property?.name}</h1>
            <h5 className={styles.location}>{property?.location?.city}, {property?.location?.state}, {property?.location?.adress}</h5>
          </section>
          <section>
            <div className={styles.priceDiv}>{property?.price} USD/night</div>
            <p><a href="#pie">Reserve here</a></p>
            <div>

            </div>
          </section>
        </header>
        <section className={styles.imageRelative}>
        <button onClick={prevImage} className={styles.prevButton}><img src="https://cdn-icons-png.flaticon.com/128/271/271220.png" alt="" /></button>
        <img
              src={property?.imageUrl && property.imageUrl[activeImage]}
              alt={property?.imageUrl}
              className={styles.imageCarrousel}
            />
            <button onClick={nextImage} className={styles.nextButton}><img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="" /></button>
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
        <section id="pie" className={styles.paymentBox}></section>
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
          <About/>
      </div>
      {hasPurchased &&<div>
        <h3>Deja una reseña:</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={reviewAuthor}
              onChange={(e) => setReviewAuthor(e.target.value)}
            />
            <textarea
              placeholder="Contenido de la reseña"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
            >
              <option value={1}>1 estrella</option>
              <option value={2}>2 estrellas</option>
              <option value={3}>3 estrellas</option>
              <option value={4}>4 estrellas</option>
              <option value={5}>5 estrellas</option>
            </select>
            <button onClick={() => submitReview(p.id)}>Enviar Reseña</button></div>}
            

            <About></About>
            </div>
  
  );
};
}


export default DetailPost;
