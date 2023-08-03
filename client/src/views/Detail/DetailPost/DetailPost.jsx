import styles from "./DetailPost.module.css"
import About from "../../../components/About/About";
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailProperty } from "../../../redux/actions";

const DetailPost = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const property = useSelector((state) => state.detailProperty)
    
    useEffect(() => {
        dispatch(getDetailProperty(id))
    }, [ dispatch ])


    return(
        <div className={styles.maincontainer}>
            <div className={styles.container}>
                <header className={styles.head}>
                    <div>
                        <h1>Depto</h1>
                        <p>Departamento lindo blablabla ubicado frente al mar etc</p>
                    </div>
                    <div>
                        <h2>Precio</h2>
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
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni enim nostrum, neque laudantium culpa maiores pariatur dolorem possimus officia amet sint quisquam vel, tenetur, cum cupiditate consequatur? Consequuntur, enim blanditiis.</p>
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
                            <li>Nice</li>
                            <li>Bad</li>
                            <li>xD</li>
                            <li>:v</li>
                            <li>:'v</li>
                        </ul>
                    </div>
                </section>
            </div>
            <About/>
        </div>
    )
}

export default DetailPost;