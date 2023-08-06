import { Link } from "react-router-dom"
import Searchbar from "../Searchbar/Searchbar"
import styles from "./Navbar.module.css"
import React from 'react';


const Navbar = () => {
    return(
        <div className={styles.container}> 
          <div className={styles.containertwo}>
              <Link to={"/home"} className={styles.logo}>DreamLodge</Link>
          </div>
          <div className={styles.containertwo}>
              <Searchbar/>
          </div>  
           <div className={styles.button}>
           <div className={styles.postBtn}>
                <Link to={"/post"} className={styles.post}>Post Lodge</Link>
          </div>
          <div className={styles.loginBtn}>
                <Link to={"/login"} className={styles.login}>Login</Link>
          </div>
              </div>

          </div>
    
    )
}

export default Navbar