import React from "react"
import { useParams } from "react-router-dom"
import { getUserByUID } from "../../config/handlers"

const EditUser = () => {

    const [ user, setUser ] = React.useState({})
    const { id } = useParams()

    React.useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserByUID(id)
            if (userData) {
                setUser(userData);
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
            serUser({
                ...user,
                languages: user?.languages?.filter((langIn) => langIn != lang)
            })
        } else {
            setUser({ ...user, languages: [ ...user.languages, lang]})
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
            <header>
                <h1>Edit info user</h1>
            </header>
            <div>
                <label>uid</label>
                <input 
                    type="text" name="uid"
                    value={user?.uid}
                    onChange={handleChange}
                    readOnly
                />

                <label>First name: </label>
                <input 
                    type="text" name="name"
                    value={user?.name}
                    onChange={handleChange}
                />

                <label>Last name: </label>
                <input 
                    type="text" name="lastName"
                    value={user?.lastName}
                    onChange={handleChange}
                />

                <label>Email: </label>
                <input 
                    type="text" name="email"
                    value={user?.email}
                    onChange={handleChange}
                />

                <label>Country: </label>
                <input 
                    type="text" name="country"
                    value={user?.country}
                    onChange={handleChange}
                />

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

                <label>Image: </label>
                <input 
                    type="text" name="imageFile"
                    value={user?.imageFile}
                    onChange={handleChange}
                />
                <img src="" alt="" />
            </div>
        </div>
    )
}

export default EditUser