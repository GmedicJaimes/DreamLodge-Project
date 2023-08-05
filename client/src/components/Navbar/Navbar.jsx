import { Link } from "react-router-dom"
import Searchbar from "../Searchbar/Searchbar"
import styles from "./Navbar.module.css"
import React from 'react';


const Navbar = () => {
    return(
        <div className={styles.container}> 
            <Link to={"/home"} className={styles.logo}>DreamLodge</Link>
            
            <Searchbar/>
            /*Veamos si funciona esto */
            {/* <Link to={"/signin"}>Sign In</Link> */}
            <div className={styles.button}>
              <Link to={"/post"} className={styles.post}>Post Lodge</Link>
              <Link to={"/login"} className={styles.login}>Login</Link>
            </div>
            
        </div>
    )
}

export default Navbar