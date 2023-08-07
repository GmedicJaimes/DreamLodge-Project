import styles from "./DetailPost.module.css"
import React from 'react';
import About from "../../../components/About/About";
import { useEffect } from "react"
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

const DetailPost = () => {


//   const { userId, propertyId } = useParams(); // Obtener userId y propertyId de los parámetros de la URL

//   const property = useSelector((state) => state.detailPropertie);

//   useEffect(() => {
//     dispatch(getDetailPropertie(userId, propertyId));
//   }, [dispatch, userId, propertyId]);


    const { id, user_id } = useParams()
    const dispatch = useDispatch()

    const property = useSelector((state) => state.detailProperty)
    // const user = useSelector((state) => state.detailUser)

    // useEffect(() => {
    //     dispatch(getDetailProperty(id))
    //     dispatch(getDetailUser(user_id))
    //     return () => {
    //         dispatch(getDetailClean());
    //     };
    // }, [ dispatch, id])

    return(
        <div>
            <div className={styles.containerPost}>
                <header className={styles.head}>
                    <div className={styles.headLeft}>
                        <h1>{property.name}</h1>
                        <p>{property.location?.address}, {property.location?.city}, {property.location?.state}.</p>
                    </div>
                    <div className={styles.headRigth}>
                        <p>$ {property.price} USD noche</p>
                        <button >Reserve</button>
                    </div>
                </header>
                <div className={styles.image}>
                    <img src={property.image} alt={property.name} className={styles.imgOne}/>
                    <div className={styles.sectionOne}>
                      <img src={property.image} alt={property.name} className={styles.imgOne}/>
                      <div className={styles.sectionTwo}>
                        <img src={property.image} alt={property.name} className={styles.imgOne}/>
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