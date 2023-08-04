import { Link } from "react-router-dom"
import styles from "./Card.module.css"


const Card = ({property}) => {
    const {name, price, location} = property
    return(
        <div className={styles.container}>
            <section>
                <div className={styles.fakeImage}></div>
            </section>
            <section>
                <h1>{name}</h1>
                <p>{price}</p>
                <p>{location}</p>

                <Link to={"/rooms"}>
                    <button>More</button>
                </Link>
            </section>
        </div>
    )
}

export default Card