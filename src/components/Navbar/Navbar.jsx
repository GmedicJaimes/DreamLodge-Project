import { Link } from "react-router-dom"
import Searchbar from "../Searchbar/Searchbar"
import styles from "./Navbar.module.css"
import { auth } from "../../config/firebase";
import { logOut } from "../../config/handlers";
import { useState, useEffect } from "react";
import Dropdown from '../Dropdown/Dropdown'


const Navbar = () => {
  //? estado local par el login del usuario
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  

  //? estado local para la busqueda por query
  // const [searchValue, setSearchValue] = useState(''); // Nuevo estado para el valor de búsqueda
 
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);


  // //* funcion para guardar el valor de la busqueda
  // function handleChange(event) {
  //   event.preventDefault()

  //   console.log('escribo cosas');
  //   const value = event.target.value;
  //   console.log(value);
  //   setSearchValue(value)

  //   // const searchLocation = async () => {
  //   //   const search = await filterPropertiesBySearch(searchValue)
  //   //   setSearchValue(search)
  //   // }
  //   // searchLocation();
  // }

  // function handleSubmit(searchValue){
  //   console.log('madafucka')
  //   const searchLocation = async () => {
  //     const search = await getPropertiesByState(searchValue)
  //     setSearchValue(search)
  //   }
  //   searchLocation();
  // }

  // //* useEffect para la busqueda por query
  // useEffect(() => {
  //   const searchLocation = async () => {
  //     const search = await getPropertiesByState(searchValue)
  //     setSearchValue(search)
  //   }
  //   searchLocation();
  // })

    return(
      <div className={styles.container}> 
        <div className={styles.containertwo}>
          <Link to={"/home"} className={styles.logo}>DreamLodge</Link>
        </div>
        <div className={styles.containerSearch}>
            <Searchbar/>
            {/* <Searchbar handleChange={handleChange} handleSubmit={handleSubmit}/> */}
      
        </div>  
        <div className={styles.button}>
        
          {
            currentUser !== null 
            ? <div className={styles.button}>
                <div className={styles.postBtn}>
                  <Link to={"/tutorial"} className={styles.post}>Post Lodge</Link>
                </div>
                <div className={styles.postBtn}>
                  
                </div>
              </div>
            : 
            <div className={styles.button}>
              <div className={styles.postBtn}>
                <Link to={"/login"} className={styles.post} onClick={()=> {alert("You must be logged in")}}>Post Lodge</Link>
              </div>
              <div className={styles.loginBtn}>
                <Link to={"/login"} className={styles.login}>Login</Link>
              </div>
            </div>
          }
        </div>
      </div>
    )
}

export default Navbar