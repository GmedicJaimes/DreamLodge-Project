import React from 'react'
import Login from '../../components/Login/Login'
import SignIn from '../../components/SignIn/SignIn'
import styles from "./LoginSignin.module.css"
import About from "../../components/About/About"

export const LoginSignin = () => {
  return (
    <div >
      <div className={styles.bigContainer}>
        <Login/>
        <SignIn/>
      </div>
        <About/>
    </div>
  )
}


