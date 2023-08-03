import { Link } from "react-router-dom"
import styles from "./Card.module.css"

const Card = () => {
    return(
        <div className={styles.container}>
            <h1>Propiedad</h1>
            <h2>Precio: $200</h2>

            <Link to={"/rooms"}>
                <button>Detalles</button>
            </Link>
        </div>
    )
}

export default Card