import React from 'react'
import Login from '../../components/Login/Login'
import SignIn from '../../components/SignIn/SignIn'
import styles from "./LoginSignin.module.css"
import About from "../../components/About/About"

export const LoginSignin = () => {
  return (
    <div className={styles.loginContainer} >
      <div className={styles.bigContainer}>
        <Login/>
        {/* <SignIn/> */}
      </div>
        <About className={styles.aboutLogin}/>
    </div>
  )
}


