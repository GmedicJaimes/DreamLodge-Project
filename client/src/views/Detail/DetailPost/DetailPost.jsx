import styles from "./DetailPost.module.css"
import About from "../../../components/About/About";
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPropertie } from "../../../redux/actions";
import { Link } from "react-router-dom";

const DetailPost = () => {


//     const dispatch = useDispatch();
//   const { userId, propertyId } = useParams(); // Obtener userId y propertyId de los parámetros de la URL

//   // Puedes obtener la propiedad de Redux usando el useSelector
//   const property = useSelector((state) => state.detailPropertie);

//   // Llamar a la acción para obtener los detalles de la propiedad
//   useEffect(() => {
//     dispatch(getDetailPropertie(userId, propertyId));
//   }, [dispatch, userId, propertyId]);

//   return (
//     <div>
//       {/* Aquí puedes mostrar los detalles de la propiedad */}
//       <h2>{property.name}</h2>
//       <p>{property.description}</p>
//       {/* ...otros detalles de la propiedad */}
//     </div>
//   );
// };

    const { id } = useParams()
    const dispatch = useDispatch()

    const propertie = useSelector((state) => state.detailPropertie)
    const user = useSelector((state) => state.detailUser)

    useEffect(() => {
        dispatch(getDetailPropertie(id))
        // dispatch(getDetailUser(userId))
    }, [ dispatch ])

    return(
        <div>
        {
            user?.propertie.map((prop) => (
                <div className={styles.maincontainer} prop={prop}>
            <div className={styles.container}>
                <header className={styles.head}>
                    <div>
                        <h1>{propertie.name}</h1>
                        <p>{propertie.location}</p>
                        <Link to={"/user"}>Owner</Link>
                    </div>
                    <div>
                        <h2>{propertie.price}</h2>
                        <button className={styles.btn}>Reserve</button>
                    </div>
                </header>
                <div>
                    <img src="" alt="" />
                </div>
                <div className={styles.line}></div>
                <div className={styles.detailContainer}>
                    <div>
                        <h2>Overview</h2>
                        <p>{propertie.description}</p>
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
                        <h2>Services</h2>
                    </div>
                    <div className={styles.srvcContainer}>
                        <div className={styles.containerList}>
                            <ul>
                                <li>Restaurant</li>
                                <li>Cafeteria</li>
                                <li>Wifi</li>
                                <li>TV</li>
                                <li>Bathroom</li>
                                <li>Safety deposit box</li>
                                <li>Garage</li>
                                <li>Room Service</li>
                                <li>Pets allowed</li>
                                <li>Heating</li>
                                <li>Washer</li>
                                <li>Kitchen</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <div className={styles.line}></div>
                <section className={styles.division}>
                    <h2>Opinions</h2>
                    <div>
                        <ul>
                            {/* {
                                propertie?.comment.map((com) => {
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
            )
        }
        </div>
    )       
}

export default DetailPost;