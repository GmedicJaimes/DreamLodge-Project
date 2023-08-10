import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import styles from "./DetailUser.module.css"
import About from "../../../components/About/About"
import { getUserByUID } from '../../../config/handlers.js';



const DetailUser = () => {
   
    
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserByUID(id);
            if (userData) {
                setUser(userData);
            } else {
                console.log("El usuario no existe o no coincide con el UID proporcionado.");
            }
        };

        fetchUserData();
    }, [id]);

    return(
        <div>
<img 
  src={user?.banner || undefined}
  alt=""
  className={styles.portada}
  style={{ backgroundColor: user?.banner ? 'transparent' : 'gray' }}
/>
            <div className={styles.containerInfo}>
                <div className={styles.dataUser}>
                    <img  src={user?.image} className={styles.profilePic} />
                    <div className={styles.blockDU}>
                        <div className={styles.nameTittle}>
                            <h3>{user?.name}</h3>
                            <p>Owner</p>
                        </div>
                        <p>{user?.country}</p>
                    </div>
                    <div className={styles.blockDU}>
                        <h5>Score</h5>
                        <p>{user?.review}</p>
                    </div>
                    <div className={styles.blockDU}>
                        <h5>Member since: </h5>
                        <p>{user?.createdAt}</p>
                    </div>
                </div>
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.menuSide}>
                    <div className={styles.containerHead}>
                        <h4>My Properties</h4>
                        <Link to={`/config/${id}`}>
                            <button>Editar usuario</button>
                        </Link>
                    </div>
                </div>
                <div className={styles.propertiesSide}>
                {
                    user?.properties?.map(( property ) => { 
                        return( 
                            <Link key={property.id}  to={`/rooms/${property.id}`} className={styles.link}>
                                <div className={styles.container}>
                                    <div className={styles.image}>
                                        <img src={property.imageUrl} alt="pic of the house" />
                                    </div>
                                    <Link to={`/editpr/${property.id}`}>
                                        <button>BOTON SUPER SECRETO NO TOCAR NI BORRAR</button>
                                    </Link>
                                    <section className={styles.info}>
                                        <h3>{property.location.state}, {property.location.city}</h3>
                                        <p className={styles.infoName}>{property.name}</p>
                                        <p className={styles.infoPrice}>$ {property.price} USD noche</p>
                                    </section>
                                </div>
                            </Link>
                        )
                    })
                }
                </div>
            </div>
            <About/>
        </div>
    )
}

export default DetailUser;







































// // import { useDispatch, useSelector } from "react-redux"
// // import { getDetailUser,getDetailClean } from "../../../redux/actions"
// import React from 'react';
// import { useParams } from "react-router-dom"
// import { Link } from "react-router-dom"
// import styles from "./DetailUser.module.css"
// import About from "../../../components/About/About"
// import { useEffect } from "react";

// const DetailUser = () => {

//     const { id } = useParams()
//     // const dispatch = useDispatch()

//     const user = useSelector((state) => state.detailUser)
    
//     // useEffect(() => {
//     //     dispatch(getDetailUser(id));
//     //     return () => {
//     //         dispatch(getDetailClean());
//     //     };
//     // }, [id, dispatch]);
    

//     return(
//         <div>
//             <img src={user.banner} alt="" className={styles.portada}/>
//             <div className={styles.containerInfo}>
//                 <div className={styles.dataUser}>
//                     <img src={user.image} alt={user.username} className={styles.profilePic}/>
//                     <div className={styles.blockDU}>
//                         <div className={styles.nameTittle}>
//                             <h3>{user.firstName} {user.lastName}</h3>
//                             <p>Owner</p>
//                         </div>
//                         <p>{user.country}</p>
//                     </div>
//                     <div className={styles.blockDU}>
//                         <h5>Score</h5>
//                         <p>5 Stars</p>
//                     </div>
//                     <div className={styles.blockDU}>
//                         <h5>Member since: </h5>
//                         <p>{user.createdAt}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className={styles.bodyContainer}>
//                 <div className={styles.menuSide}>
//                     <div className={styles.containerHead}>
//                         <h4>My Properties</h4>
//                         {/* <Link><h4>Reviews</h4></Link>
//                         <Link><h4>Photos and Videos</h4></Link>  */}
//                     </div>
//                 </div>
//                 <div className={styles.propertiesSide}>
//                 {
//                     user.properties?.map(( property ) => { 
//                         return( 
//                             <Link key={property.id}  to={`/rooms/${property.id}`} className={styles.link}>
//                                 <div className={styles.container}>
//                                     <div className={styles.image}>
//                                         <img src={property.image} alt="pic of the house" />
//                                     </div>
//                                     <section className={styles.info}>
//                                         <h3>{property.location.state}, {property.location.city}</h3>
//                                         <p className={styles.infoName}>{property.name}</p>
//                                         <p className={styles.infoPrice}>$ {property.price} USD noche</p>
//                                     </section>
//                                 </div>
//                             </Link>
//                     )})
//                 }
//                 </div>
//             </div>
//             <About/>
//         </div>
//     )
// }

// export default DetailUser;