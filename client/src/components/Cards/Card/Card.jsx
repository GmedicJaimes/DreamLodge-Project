import { Link } from "react-router-dom"
import styles from "./Card.module.css"

const propertie = {
    technologies: "Jacuzzi",
    name: "Cabañita",
    description: "Esta es una propiedad de es developer",
    extraAmenities: null,
    location: "Mar de Las Pampas",
    comment: null,
    specialServices: false,
    views: 150,
    rooms: 4,
    price: 20
}
const Card = () => {
    return(
        <div className={styles.container}>
            <h1>{propertie.name}</h1>
            <h2>{propertie.price}</h2>
            <h2>{propertie.location}</h2>

            <Link to={"/rooms"}>
                <button>More</button>
            </Link>
        </div>
    )
}

export default Card