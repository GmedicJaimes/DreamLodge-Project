import styles from "./DetailPost.module.css"
import React, { useState, useEffect } from 'react';
import About from "../../../components/About/About";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'

import {useParams, Link } from "react-router-dom";
import { detailId } from "../../../config/handlers";

import {getPaymentStatus, updateAvaible} from '../../../config/handlers'
const DetailPost = () => {  
  const { id } = useParams()
  const [property, setPropertyDetail] = useState([])
  // console.log(property);
  // console.log(detailId)




  // CONFIGURACION DEL PAGO=======================================
  const[preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-b1609369-11aa-4417-ac56-d07ef28cfcff");

    const createPreference = async()=>{
        try {
            const response = await axios.post(`http://localhost:3001/createorder`, {
                description: `${property.name}`,
                price: `${totalPrice}`,
                quantity: `${selectedDays}`,
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
                        //si el pago fue aprovado se actualiza el avaible de "true" a "fals"
                        updateAvaible(property.id);
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
        }
    }

      React.useEffect(() => {
        localStorage.setItem('propertyData', JSON.stringify({
            idTicket: idTicket,
            property: property,
            selectedDays: selectedDays,
            totalPrice: totalPrice
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
      setPropertyDetail(detailPost)
console.log(property)
    }
    propertiesDetail();
  }, [])



  return(
    
      <div>
          <div className={styles.containerPost}>
              <header className={styles.head}>
                  <div className={styles.headLeft}>
                      <h1>{property?.name}</h1>
                      {property && (
        <React.Fragment>
            {property.location && (
                <p>{property.location.city}, {property.location.state}.</p>
            )}
        </React.Fragment>
    )}
                   </div>
                  <div className={styles.headRigth}>
                      <p>$ {property?.price} USD/night</p>
                      <h3>Select the number of reservation days:</h3>
              <input
                type="number"
                min="1"
                value={selectedDays}
                onChange={(e) => setSelectedDays(Number(e.target.value))}
              />
              <button onClick={handleCalculatePrice}>Calculate Price</button>
              {totalPrice > 0 && <p>Total to pay: $ {totalPrice}</p>}
                      
                      <button onClick={handleBuy}>Reserve</button>
                      {preferenceId && <Wallet initialization={{ preferenceId: preferenceId}} />}
                      
                  </div>
              </header>
              <div className={styles.image}>
                  <img src={
                    property.imageUrl
                    } 
                    alt={property?.name} className={styles.imgOne}/>
                  <div className={styles.sectionOne}>
                    <img src={property?.imageUrl} alt={property?.name} className={styles.imgOne}/>
                    <div className={styles.sectionTwo}>
                      <img src={property?.imageUrl} alt={property?.name} className={styles.imgOne}/>
                    </div>
                    
                  </div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.overview}>
                  <div className={styles.sectionOverOne}>
                      <h2>Overview</h2>
                      <p>{property?.description}</p>
                  </div>
                  <div className={styles.sectionOverTwo}>
                      <h2>Rating</h2>
                      <div className={styles.ratingBox}>
                          <p>4,20</p>
                      </div>
                  </div>
              </div>
              <div className={styles.line}></div>
              <section className={styles.Rooms}>
                  <div className={styles.title}>
                      <h2>Rooms</h2>
                      <Link to={`/user/${property?.userId}`} className={styles.titleLink}>
                          <button className={styles.btn}>Owner</button>
                      </Link>
                  </div>
                  <div className={styles.containerRooms}>
                      <ul> 
                            <li>Guest: {property?.stances?.guest} </li>
                          <li>Rooms: {property?.stances?.rooms}</li>
                          <li>Bathrooms: {property?.stances?.bathrooms}</li>
                          <li>Bed: {property?.stances?.beds}</li>
                          <li>Status: 
                            {
                              property?.available === true ? ' Disponible ✔️' : ' Ocupado ❌'
                            }
                          </li>
                      </ul>
                  </div>
              </section>
              <div className={styles.line}></div>
              <section className={styles.Services}>
                  <div className={styles.titleServices}>
                      <h2>Services</h2>
                  </div>
                  <div className={styles.containerServices}>
                      <div className={styles.containerList}>
                          <ul>
                              {
                                  property?.services?.map((serv) => {
                                      return(
                                          <li>{serv}</li>
                                      )
                                  })
                              }
                          </ul>
                      </div>
                  </div>
              </section>
              <div className={styles.line}></div>
              <section className={styles.Opinions}>
                  <h2>Opinions</h2>
                  <p>From {property?.guests} guests</p>
                  <div>
                      <ul>
                          {/* {
                              property?.reviews.map((com) => {
                                  return(
                                      <li>{com}</li>
                                  )
                              })
                          } */}
                      </ul>
                  </div>
              </section>
          </div>
          <About/>
      </div>
  )
}
export default DetailPost;