import { Link } from "react-router-dom"
import Searchbar from "../Searchbar/Searchbar"
import styles from "./Navbar.module.css"
import React from 'react';


const Navbar = () => {
    return(
        <div className={styles.container}> 
          <div className={styles.containertwo}>
              <Link to={"/home"} className={styles.logo}>DreamLodge</Link>
              
              <Searchbar/>
              
              {/* <Link to={"/signin"}>Sign In</Link> */}
              <div className={styles.button}>
                <Link to={"/post"} className={styles.post}>Post Lodge</Link>
                <Link to={"/login"} className={styles.login}>Login</Link>
              </div>

          </div>
        </div>
    )
}

export default Navbar