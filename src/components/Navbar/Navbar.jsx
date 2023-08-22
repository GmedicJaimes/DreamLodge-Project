import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"
import { auth } from "../../config/firebase";
import React from "react";
import Dropdown from "../Dropdown/Dropdown"
import { logOut, getPropertiesList } from "../../config/handlers";

const Navbar = () => {
  const [currentUser, setCurrentUser] = React.useState(auth.currentUser);
  
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
        
        <div className={styles.button}>
          <div className={styles.adminNav}>
            {currentUser && currentUser.email === "admindreamlodge@gmail.com" ? (
              <Link to={"/admin"} className={styles.admin}>Dashboard Admin</Link>
            ) : null}
          </div>
          {
            currentUser !== null 
            ? <div className={styles.button}>
                <div className={styles.postBtn}>
                  <Link to={"/tutorial"} className={styles.post}>Post Lodge</Link>
                </div>
                <div className={styles.user}>
                  <Dropdown className={styles.menuNav}></Dropdown>
                </div>
              </div>
            : 
            <div className={styles.button}>
              <div className={styles.postBtn}>
                <Link to={"/login"} className={styles.post} onClick={()=> {swal({title: 'Warning',text: "You must be logged in",icon: 'warning', dangerMode: true })}}>Post Lodge</Link>
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

export default Navbar;