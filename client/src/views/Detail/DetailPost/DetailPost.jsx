import styles from "./DetailPost.module.css"
import About from "../../../components/About/About";
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPropertie } from "../../../redux/actions";
import { Link } from "react-router-dom";

const DetailPost = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    // const propertie = useSelector((state) => state.detailPropertie)
    const propertie = {
        technologies: "Jacuzzi",
        name: "Cabañita",
        description: "Esta es una propiedad de es developer",
        extraAmenities: null,
        location: "Mar de Las Pampas",
        comment: [],
        specialServices: false,
        views: 150,
        rooms: 4,
        price: 20
    }

    useEffect(() => {
        dispatch(getDetailPropertie(id))
    }, [ dispatch ])

    return(
        <div className={styles.maincontainer}>
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
                            {
                                propertie.comment.map((com) => {
                                    return(
                                        <li>{com}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </section>
            </div>
            <About/>
        </div>
    )
}

export default DetailPost;