import styles from "./DetailPost.module.css"
import React, { useState, useEffect } from 'react';
import About from "../../../components/About/About";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'

import {useParams, Link } from "react-router-dom";
import { detailId } from "../../../config/handlers";

const DetailPost = () => {  
  const { id } = useParams()
  const [property, setPropertyDetail] = useState([])
  // console.log(property);
  // console.log(detailId)
  console.log(property);




  // CONFIGURACION DEL PAGO=======================================
  const[preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-b1609369-11aa-4417-ac56-d07ef28cfcff") //<<<<<====||| ACA VA EL "TOKEN" DEL OWNER QUE DEBERIA ESTAR EN EL ESTADO LOCAL DE "property.tokken"
    const createPreference = async()=>{
        try {
            const response = await axios.post(`http://localhost:3001/createorder`, {
                description: `${property.name}`,
                price: `${totalPrice}`,
                quantity: `${selectedDays}`,
                currency_id: "ARS"
            })

            const { id } = response.data;

            return id
        } catch (error) {
            console.log(error)
        }
    }
    const handleBuy = async()=>{
        const id = await createPreference();
        if (id){
            setPreferenceId(id)
        }
    }



  //CALCULAR EL PRECIO p/dias========================================
  const [selectedDays, setSelectedDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleCalculatePrice = () => {
    const pricePerDay = property.price;
    const calculatedPrice = selectedDays * pricePerDay;
    setTotalPrice(calculatedPrice);
  }; //CALCULAR EL PRECIO
  //=============================================================
  //? estado que guarda la propiedad traida por params

  
  

  useEffect(() => {
    const propertiesDetail = async () => {
      const detailPost = await detailId(id);
      setPropertyDetail(detailPost)

    }
    propertiesDetail();
  }, [])

  return(
    
      <div>
          <div className={styles.containerPost}>
              <header className={styles.head}>
                  <div className={styles.headLeft}>
                      <h1>{property.name}</h1>
                       <p>{property.location?.city}, {property.location?.state}.</p>
                   </div>
                  <div className={styles.headRigth}>
                      <p>$ {property.price} USD/noche</p>
                      <h3>Seleccione la cantidad de días de reserva:</h3>
              <input
                type="number"
                min="1"
                value={selectedDays}
                onChange={(e) => setSelectedDays(Number(e.target.value))}
              />
              <button onClick={handleCalculatePrice}>Calcular Precio</button>
              {totalPrice > 0 && <p>Total a pagar: $ {totalPrice}</p>}
                      
                      <button onClick={handleBuy}>Reserve</button>
                      {preferenceId && <Wallet initialization={{ preferenceId: preferenceId}} />}
                      
                  </div>
              </header>
              <div className={styles.image}>
                  <img src={property.imageUrl} alt={property.name} className={styles.imgOne}/>
                  <div className={styles.sectionOne}>
                    <img src={property.imageUrl} alt={property.name} className={styles.imgOne}/>
                    <div className={styles.sectionTwo}>
                      <img src={property.imageUrl} alt={property.name} className={styles.imgOne}/>
                    </div>
                    
                  </div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.overview}>
                  <div className={styles.sectionOverOne}>
                      <h2>Overview</h2>
                      <p>{property.description}</p>
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
                      <Link to={`/user/${property.userId}`} className={styles.titleLink}>
                          <button className={styles.btn}>Anfitrion</button>
                      </Link>
                  </div>
                  <div className={styles.containerRooms}>
                      <ul>
                          <li>Guest: {property.rooms?.[0]}</li>
                          <li>Rooms: {property.rooms?.[1]}</li>
                          <li>Bathrooms: {property.rooms?.[2]}</li>
                          <li>Bed: {property.rooms?.[3]}</li>
                          <li>Status: 
                            {
                              property.disponible === true ? ' Disponible ✔️' : ' Ocupado ❌'
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
                                  property.services?.map((serv) => {
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
                  <p>From {property.guests} guests</p>
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