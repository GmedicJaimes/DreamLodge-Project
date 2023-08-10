import { Link } from "react-router-dom"
import Searchbar from "../Searchbar/Searchbar"
import styles from "./Navbar.module.css"
import React, {useState} from 'react';
import { auth } from "../../config/firebase";
import { logOut } from "../../config/handlers";
import { usePropertiesList } from "../Filters/PropertiesContext";

const Navbar = () => {
  const properties = usePropertiesList();// Obtiene la lista de propiedades usando el hook
  const [currentUser, setCurrentUser] = React.useState(auth.currentUser);
  const [filteredProperties, setFilteredProperties] = React.useState([]);

  const handlePropertiesFiltered = (filtered) => {
    setFilteredProperties(filtered);
  };
 
  
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);



    return(
      <div className={styles.container}> 
        <div className={styles.containertwo}>
            <Link to={"/home"} className={styles.logo}>DreamLodge</Link>
        </div>
        <div className={styles.containerSearch}>
            <Searchbar onPropertiesFiltered={handlePropertiesFiltered}/>
        </div>  
        <div className={styles.button}>
          {
            currentUser !== null 
            ? <div className={styles.button}>
                <div className={styles.postBtn}>
                  <Link to={"/post"} className={styles.post}>Post Lodge</Link>
                </div>
                <div className={styles.loginBtn}>
                  <button className={styles.login} onClick={logOut}>LOG OUT</button>
                </div>
              </div>
            : 
            <div className={styles.button}>
              <div className={styles.postBtn}>
                <Link to={"/login"} className={styles.post}>Post Lodge</Link>
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