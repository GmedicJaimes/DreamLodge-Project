import React from "react"
import styles from "./UserEditProperty.module.css"
import { detailId } from "../../config/handlers"

const UserEditProperty = () => {

    const [property, setPropertyDetail] = React.useState([])

//     React.useEffect(() => {
//         if (property[0] !== undefined) return
//         const propertiesDetail = async () => {
//         const detailPost = await detailId("IK4PQvCkFZ4gOp9YEqTw");
//         setPropertyDetail(detailPost)
//     }
//     propertiesDetail();
//   }, [])

const [ estado, setEstado ] = React.useState({
    ciudad: "kansas",
    pais: "EEUU"
})
const test = "random"

    const handleChange = (event) => {
        const { name, value } = event.target

        setEstado({
            ...estado,
            name : value
        })
    }

  const editarButton = (event) => {
        console.log(event);
  }

    return(
        <div>
            <div  className={styles.bigContainer}>
            <h1>Editar propiedad</h1>
                <div>
                    <h1>Name: {property?.name}</h1>
                    <p>City: {property?.location?.city}</p>
                    <p>State: {property?.location?.state}</p>
                    <p>Adress: {property?.location?.adress}</p>
                    <p>Guests: {property?.stances?.guest}</p>
                    <p>Rooms: {property?.stances?.rooms}</p>
                    <p>Bathrooms: {property?.stances?.bathrooms}</p>
                    <p>Beds: {property?.stances?.beds}</p>
                    <p>Description: {property?.description}</p>
                    <p>Price: {property?.price}</p>
                    <p>Imagen:</p>
                    <img src={property?.imageUrl} alt="" />
                    <p>Disponibilidad: {property?.disponible}</p>
                    <p>Test input</p>
                    <input 
                        name="ciudad" 
                        onChange={handleChange} 
                        type="text" 
                        value={estado.ciudad} 
                        disabled
                    />
                    <button 
                        name="ciudad" 
                        onClick={editarButton}>Editar</button>
                    <input 
                        name="pais" 
                        onChange={handleChange} 
                        type="text" 
                        value={estado.pais} 
                        disabled
                    />
                    <button 
                        name="pais" 
                        onClick={editarButton}>Editar</button>
                </div>
            </div>
        </div>
    )
}

export default UserEditProperty
