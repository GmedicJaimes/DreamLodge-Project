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


    const { id } = useParams()
    const dispatch = useDispatch()

    const property = useSelector((state) => state.detailPropertie)
    const user = useSelector((state) => state.detailUser)

    useEffect(() => {
        dispatch(getDetailPropertie(id))
        // dispatch(getDetailUser(userId))
    }, [ dispatch ])

    return(
        <div>
            <div className={styles.container}>
                <header className={styles.head}>
                    <div>
                        <h1>{property.name}</h1>
                        <p>{property.location?.country}</p>
                        <p>{property.location?.estado}</p>
                        <p>{property.location?.direction}</p>
                        <Link to={"/user"}>Owner</Link>
                    </div>
                    <div>
                        <h2>{property.price}</h2>
                        <button className={styles.btn}>Reserve</button>
                    </div>
                </header>
                <div>
                    <img src={property.image} alt={property.name} />
                </div>
                <div className={styles.line}></div>
                <div className={styles.detailContainer}>
                    <div>
                        <h2>Overview</h2>
                        {
                            property.types?.map((type) => {
                                return(
                                    <p>{type}</p>
                                )
                            })
                        }
                        <p>{property.description}</p>
                    </div>
                    <div>
                        <div className={styles.ratingBox}>
                            <h2>Rating</h2>
                            <p>4,20</p>
                        </div>
                    </div>
                </div>
                <div className={styles.line}></div>
                <section className={styles.division}>
                    <div>
                        <h2>Rooms</h2>
                    </div>
                    <div className={styles.srvcContainer}>
                        <div className={styles.containerList}>
                            <ul>
                                <li>Bathrooms: {property.bathrooms}</li>
                                <li>Bed: {property.bed}</li>
                                <li>Rooms: {property.rooms}</li>
                                <li>Dormitorios: {property.dormitorio}</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <div className={styles.line}></div>
                <section className={styles.division}>
                    <div>
                        <h2>Services</h2>
                    </div>
                    <div className={styles.srvcContainer}>
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
                <section className={styles.division}>
                    <h2>Opinions</h2>
                    <p>From {property.guests} guests</p>
                    <div>
                        <ul>
                            {/* {
                                property?.comment.map((com) => {
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