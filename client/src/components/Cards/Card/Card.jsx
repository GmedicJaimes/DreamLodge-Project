import { Link } from "react-router-dom"

const Card = () => {
    return(
        <div>
            <h1>Propiedad</h1>
            <h2>Precio: $200</h2>

            <Link to={"/rooms"}>
                <button>Detalles</button>
            </Link>
        </div>
    )
}

export default Card