import { Link } from "react-router-dom"
import styles from "./Card.module.css"


const Card = ({property}) => {
    const {name, price, location} = property
    return(
        <div className={styles.container}>
            <h1>{name}</h1>
            <h2>{price}</h2>
            <h2>{location}</h2>

            <Link to={"/rooms"}>
                <button>More</button>
            </Link>
        </div>
    )
}

export default Card