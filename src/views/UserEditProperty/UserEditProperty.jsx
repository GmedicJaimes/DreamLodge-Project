import React from "react"
import styles from "./UserEditProperty.module.css"
import { detailId, updateProperty } from "../../config/handlers"
import { useParams } from "react-router-dom"

const UserEditProperty = () => {

    const { id } = useParams()

    const [property, setPropertyDetail] = React.useState({})
    
    const [edit, setEdit] = React.useState(true)

    React.useEffect(() => {
        // if (property !== undefined) return
        const propertiesDetail = async () => {
            const detailPost = await detailId(id);
            setPropertyDetail(detailPost)
        }
        propertiesDetail();
    }, [])

    const opciones = [0, 1, 2, 3, 4, 5, 6];
    const types = ["Cabins", "Beachfront", "Mansion", "Countryside", "Room"];
    const servicesAvailable = ["Wifi", "TV", "Kitchen", "A/C", "Washing Machine", "Safe-deposit box", "Heating", "Pets allowed", "Garage", "Coffee maker"]

    const handleChange = (event) => {
        const { name, value } = event.target

        setPropertyDetail({
            ...property,
            [name]: value
        })
    }

    const handleLocation = (event) => {
        const { name, value } = event.target

        setPropertyDetail({
            ...property,
            location: { ...property.location, [name]: value }
        })
    }

    const handelRooms = (event) => {
        const { name, value } = event.target

        setPropertyDetail({
            ...property,
            stances: { ...property.stances, [name]: value }
        })
    }

    const handleServices = (event) => {
        const serv = event.target.value

        if (property?.services?.includes(serv)) {
            setPropertyDetail({
                ...property,
                services: property.services?.filter((servIn) => servIn != serv)
            })
        } else {
            setPropertyDetail({ ...property, services: [...property.services, serv] })
        }
    }

    const handleAvailable = () => {
        setPropertyDetail({...property, available: !property.available})
    }

    const editarButton = () => {
        setEdit(!edit)
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            await updateProperty(id, property)
            alert("Property modified")
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <div className={styles.containerEdit}>
          <div className={styles.bigContainer}>
            <div className={styles.title}>
              <h1>Edit Property</h1>
              <button onClick={editarButton}>Edit</button>
            </div>
              <form onSubmit={handleUpdate} className={styles.form}>
                <div className={styles.sectionOne}>
                    <p>Name:</p>
                    <input type="text" name="name" value={property?.name} disabled={edit} onChange={handleChange}/>
                    <p>City: </p>

                    <input
                        onChange={handleLocation}
                        type="text" name="city"
                        value={property?.location?.city}
                        disabled={edit}
                    />

                    <p>State</p>
                    <input
                        onChange={handleLocation}
                        type="text" name="state"
                        value={property?.location?.state}
                        disabled={edit}
                    />

                    <p>Adress</p>
                    <input
                        onChange={handleLocation}
                        type="text" name="adress"
                        value={property?.location?.adress}
                        disabled={edit}
                    />

                  
                    <div className={styles.containerRooms}>
                      <div className={styles.selectOne}>
                        <div className={styles.roomSelect}>
                            <label>Guests:</label>
                            <select name="guest" value={property?.stances?.guest} onChange={handelRooms} disabled={edit} >
                                {opciones.map((op) => (
                                    <option key={op} value={op}>
                                        {op}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.roomSelect}>
                            <label>Rooms:</label>
                            <select name="rooms" value={property?.stances?.rooms} onChange={handelRooms} disabled={edit} >
                                {opciones.map((op) => (
                                    <option key={op} value={op}>
                                        {op}
                                    </option>
                                ))}
                            </select>
                        </div>
                      </div>


                      <div className={styles.selectTwo}>
                         <div className={styles.roomSelect}>
                            <label>Bathrooms:</label>
                            <select name="bathrooms" value={property?.stances?.bathrooms} onChange={handelRooms} disabled={edit} >
                                {opciones.map((op) => (
                                    <option key={op} value={op}>
                                        {op}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.roomSelect}>
                            <label>Beds:</label>
                            <select name="beds" value={property?.stances?.beds} onChange={handelRooms} disabled={edit} >
                                {opciones.map((op) => (
                                    <option key={op} value={op}>
                                        {op}
                                    </option>
                                ))}
                            </select>
                        </div>         
                      </div>
                        
                    </div>
                      
                </div>
                <div className={styles.sectionTwo}>
                <p>Description: </p>
                    <textarea
                        type="text"
                        name="description"
                        value={property?.description}
                        disabled={edit}
                        onChange={handleChange}
                    />

                    <p>Price: </p>
                    <input
                        type="number"
                        name="price"
                        value={property?.price}
                        disabled={edit}
                        onChange={handleChange}
                    />

                    <div className={styles.selectServices}>
                        <p>Services:</p>
                        {/* <input type="text" value={property.services} readOnly /> */}
                        <select name="services" value={property?.services} onChange={handleServices}>
                            {
                                servicesAvailable.map((srv) => {
                                    return (
                                        <option key={srv} value={srv}>{srv}</option>
                                    )
                                })
                            }
                        </select>
                          <p>{property.services}</p>
                    </div>

                    {/* <p>Imagen:</p>
                    <input 
                        type="text" 
                        name="" 
                        value={property?.imageUrl} 
                        disabled={edit} 
                        onChange={handleChange}
                    />
                    <img src={property?.imageUrl} alt="" /> */}
                    <p>Disponibilidad: </p>
                    <div className={styles.available}>
                      <input
                          type="text"
                          name="available"
                          value={property?.available}
                          readOnly
                      />
                      <button onClick={handleAvailable} className={styles.button}>
                          {property?.available ? "False": "True "}
                      </button>
                    </div>
                    
                                     
                </div>
                    
                </form>
                <button type="submit" className={styles.buttonSubmit}>Upgrade</button> 
            </div>
        </div>
    )
}

export default UserEditProperty
