import { useDispatch, useSelector } from "react-redux"
import { getDetailUser } from "../../../redux/actions"
import React from 'react';
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import styles from "./DetailUser.module.css"
import About from "../../../components/About/About"

const DetailUser = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.detailUser)
    
    useEffect(() => {
        dispatch(getDetailUser(id))
    }, [ dispatch ])

    return(
        <div>
            <div className={styles.portada}></div>
            <div className={styles.containerInfo}>
                <div className={styles.fotoPerfil}></div>
                <div className={styles.dataUser}>
                    <div className={styles.blockDU}>
                        <div className={styles.nameTittle}>
                            <h3>Lionel Messi</h3>
                            <p>Owner</p>
                        </div>
                        <p>Argentina</p>
                    </div>
                    <div className={styles.blockDU}>
                        <h5>Score</h5>
                        <p>5 Stars</p>
                    </div>
                    <div className={styles.blockDU}>
                        <h5>Years as owner</h5>
                        <p>7</p>
                    </div>
                </div>
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.containerHead}>
                    <Link><h4>My Properties</h4></Link>
                    <Link><h4>Reviews</h4></Link>
                    <Link><h4>Photos and Videos</h4></Link> 
                </div>
                <div className={styles.propertieContainer}>
                    <div className={styles.propertieBox}>
                        <div className={styles.imageA}></div>
                    </div>
                    <div className={styles.propertieBox}>
                        <div className={styles.propertieInfo}>
                                <h4>Rooms: 2</h4>
                                <h4>Precio por noche: $200</h4>
                                <Link to={"/rooms"}>
                                    <button>Ver mas</button>
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
            <About/>
        </div>
    )
}

export default DetailUser;