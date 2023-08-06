import { useDispatch, useSelector } from "react-redux"
import { getDetailUser } from "../../../redux/actions"
import React from 'react';
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import styles from "./DetailUser.module.css"
import About from "../../../components/About/About"
import { useEffect } from "react";

const DetailUser = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.detailUser)
    
    useEffect(() => {
        dispatch(getDetailUser(id))
    }, [ dispatch ])

    return(
        <div>
            <img src={user.banner} alt="" className={styles.portada}/>
            <div className={styles.containerInfo}>
                <div className={styles.dataUser}>
                    <img src={user.image} alt={user.username} className={styles.profilePic}/>
                    <div className={styles.blockDU}>
                        <div className={styles.nameTittle}>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <p>Owner</p>
                        </div>
                        <p>{user.country}</p>
                    </div>
                    <div className={styles.blockDU}>
                        <h5>Score</h5>
                        <p>5 Stars</p>
                    </div>
                    <div className={styles.blockDU}>
                        <h5>Member since: </h5>
                        <p>{user.createdAt}</p>
                    </div>
                </div>
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.menuSide}>
                    <div className={styles.containerHead}>
                        <h4>My Properties</h4>
                        {/* <Link><h4>Reviews</h4></Link>
                        <Link><h4>Photos and Videos</h4></Link>  */}
                    </div>
                </div>
                <div className={styles.propertiesSide}>
                {
                    user.properties?.map(( property ) => { 
                        return( 
                        <div className={styles.propertieContainer}>
                            <div className={styles.propertieBox}>
                                <img src={property.image} alt={property.name} className={styles.imageA}/>
                            </div>
                            <div className={styles.propertieBox}>
                                    <h2>{property.name}</h2>
                                    <h4>Rooms: {property.rooms?.reduce((a, n) => a + n, 0)}</h4>
                                    <h4>Price per night: {property.price}</h4>
                                    <Link to={`/rooms/${property.id}`}>
                                        <button className={styles.seeMbtn}>See more</button>
                                    </Link>
                            </div>
                        </div>
                    )})
                }
                </div>
            </div>
            <About/>
        </div>
    )
}

export default DetailUser;