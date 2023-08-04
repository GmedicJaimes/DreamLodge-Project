import { Link } from "react-router-dom"
import Searchbar from "../Searchbar/Searchbar"
import styles from "./Navbar.module.css"
import React from 'react';


const Navbar = () => {
    return(
        <div className={styles.container}> 
            <Link to={"/home"} className={styles.link}>DreamLodge</Link>
            
            <Searchbar/>
            
            {/* <Link to={"/signin"}>Sign In</Link> */}
            <Link to={"/login"} className={styles.link}>Login</Link>
        </div>
    )
}

export default Navbar