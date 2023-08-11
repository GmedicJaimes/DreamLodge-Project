import { Link } from "react-router-dom"
import Searchbar from "../Searchbar/Searchbar"
import styles from "./Navbar.module.css"
import React from 'react';
import { auth } from "../../config/firebase";
import { logOut, filterPropertiesByName } from "../../config/handlers";
import { useState } from "react";


const Navbar = () => {
  const [currentUser, setCurrentUser] = React.useState(auth.currentUser);
  const [host, setHost] = React.useState([]);
  const [searchValue, setSearchValue] = useState(""); // Nuevo estado para el valor de búsqueda
 
  
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    filterPropertiesByName(searchValue)
  };

    return(
      <div className={styles.container}> 
        <div className={styles.containertwo}>
          <Link to={"/home"} className={styles.logo}>DreamLodge</Link>
        </div>
        <div className={styles.containerSearch}>
{/*             <Searchbar onPropertiesFiltered={handlePropertiesFiltered}/>
 */}        </div>  
        <div className={styles.button}>
          {
            currentUser !== null 
            ? <div className={styles.button}>
                <div className={styles.postBtn}>
                  <Link to={"/post"} className={styles.post}>Post Lodge</Link>
                </div>
                <div className={styles.postBtn}>
                  <Link to={`user/${auth.currentUser.uid}`} className={styles.post}>Mi perfil</Link>
                </div>
                <div className={styles.loginBtn}>
                  <div className={styles.login} onClick={logOut}>LOG OUT</div>
                </div>
              </div>
            : 
            <div className={styles.button}>
              <div className={styles.postBtn}>
                <Link to={"/login"} className={styles.post} onClick={()=> {alert("loggeese primero parse")}}>Post Lodge</Link>
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