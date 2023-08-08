import styles from "./DetailPost.module.css"
import React, { useState, useEffect } from 'react';
import About from "../../../components/About/About";


import { Link, useParams } from "react-router-dom";
import { detailId } from "../../../config/handlers";

const DetailPost = () => {

  const { id } = useParams()

  //? estado que guarda la propiedad traida por params
  const [property, setPropertyDetail] = useState([])
  // console.log(property);
  // console.log(detailId)

  useEffect(() => {
    const propertiesDetail = async () => {
      const detailPost = await detailId(id);
      console.log('caremonda funciona' , detailPost)
      setPropertyDetail(detailPost)
      // console.log(property);
    }
    propertiesDetail();
  }, [])

  return(
    
      <div>
          <div className={styles.containerPost}>
              <header className={styles.head}>
                  <div className={styles.headLeft}>
                      <h1>{property.name}</h1>
                      <p>{property.location}, {property.location?.state}.</p>
                  </div>
                  <div className={styles.headRigth}>
                      <p>$ {property.price} USD noche</p>
                      <Link to={`/reserve/${id}`}>
                      <button >Reserve</button>
                      </Link>
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
                      <Link to={`/user/${property.user_id}`} className={styles.titleLink}>
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