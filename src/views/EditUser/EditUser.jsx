import React from "react"
import { useParams } from "react-router-dom"
import { getUserByUID, updateUser } from "../../config/handlers"
import styles from "./EditUser.module.css"
import About from "../../components/About/About"

const EditUser = () => {

    const [ user, setUser ] = React.useState({})
    const { id } = useParams()

    React.useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserByUID(id)
            if (userData) {
                setUser(userData);
                console.log(userData);
            } else {
                console.log("El usuario no existe o no coincide con el UID proporcionado.");
            }
        }

        fetchUserData()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target

        setUser({
            ...user,
            [name] : value
        })
    }

    const handleLang = (event) => {
        const lang = event.target.value

        if(user?.languages?.includes(lang)) {
            setUser({
                ...user,
                languages: user?.languages?.filter((langIn) => langIn != lang)
            })
        } else {
            setUser({ ...user, languages: [ ...user.languages, lang]})
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            await updateUser(user)
            console.log("User uptated");
        } catch (error) {
            console.log(error);
        }
    }

    const languagesAvailable = [
        "English",
        "Spanish",
        "French",
        "Portuguese",
        "German",
        "Italian",
        "Russian",
    ];

    return(
        <div>
            <div className={styles.mainContainer}>
                
            
            <form onSubmit={handleUpdate}>
                <section className={styles.configBox}>
                    <h1>Account Info</h1>
                    <section>
                        <label>First name: </label>
                        <input
                            className={styles.midInput} 
                            type="text" name="name"
                            value={user?.name}
                            onChange={handleChange}
                        />

                        <label>Last name: </label>
                        <input 
                            className={styles.midInput}
                            type="text" name="lastName"
                            value={user?.lastName}
                            onChange={handleChange}
                        />
                    </section>
                    <div>
                        <label htmlFor="">Display Name: </label>
                        <input
                        className={styles.bigInput} 
                        type="text" 
                        name="" id="" 
                        placeholder="Display Name"/>
                    </div>
                    <div>
                        <label>Email: </label>
                        <input 
                            className={styles.bigInput} 
                            type="text" name="email"
                            value={user?.email}
                            onChange={handleChange}
                        />
                    </div>
                    <button className={styles.btnBlue} onSubmit={handleUpdate}>Save Changes</button>
                </section>

                <section className={styles.configBox}>
                    <h1>Avatar config: </h1>
                    <div className={styles.bigInput}>
                        <label htmlFor="">Image Link: </label>
                        <button className={styles.btnBlue}>Upload image</button>
                        <input
                        className={styles.bigInput} 
                        type="text" name="imageFile"
                        value={user?.image}
                        onChange={handleChange}
                        />
                        <img src={user?.image} alt="Avatar" className={styles.avatar}/>
                    </div>
                </section>

                <section className={styles.configBox}>
                    <h1>Profile Details</h1>
                    <section className={styles.fixInput}>
                        <label>Country: </label>
                        <input 
                        className={styles.midInput} 
                            type="text" name="country"
                            value={user?.country}
                            onChange={handleChange}
                        />
                            <label htmlFor="">State: </label>
                            <input
                            className={styles.midInput} 
                            type="text" 
                            name="" id="" 
                            placeholder="State"/>
                        
                    </section>
                    <div>
                        <label htmlFor="">Website: </label>
                        <input
                        className={styles.bigInput} 
                        type="text" 
                        name="" id="" 
                        placeholder="Website"/>
                    </div>
                    <div>
                        <label htmlFor="">Bio: </label>
                        <input
                        className={styles.bigInput} 
                        type="text" 
                        name="" id="" 
                        placeholder="Bio"/>
                    </div>
                    <section>
                        <label htmlFor="">Lenguages: </label>
                        <input 
                            type="text" 
                            value={user?.languages} 
                        readOnly />
                        <select name="languages" onChange={handleLang}>
                            {
                            languagesAvailable.map((lang) => {
                                return(
                                    <option value={lang} key={lang}>{lang}</option>
                                )}) 
                            }
                        </select>
                    </section>
                    <button className={styles.btnBlue} onSubmit={handleUpdate}>Save Changes</button>
                </section>

                <section className={styles.configBox}>
                    <h1>Security Settings</h1>
                    <div>
                        <label>uid</label>
                        <input 
                            type="text" name="uid"
                            value={user?.uid}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <h3>Change Password</h3>
                    <div>
                        <input type="password" name="" id="" placeholder="Old Password"/>
                        <input type="password" name="" id="" placeholder="New Pasword"/>
                        <input type="password" name="" id="" placeholder="Repeat New Password"/>
                    </div>
                    <button className={styles.btnBlue} onSubmit={handleUpdate}>Save Changes</button>
                </section>

                
            </form>
            </div>
            <About></About>
        </div>
    )
}

export default EditUser