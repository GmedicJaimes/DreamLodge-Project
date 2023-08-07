import React from 'react'
import About from "../../components/About/About"
import styles from "./Signin.module.css"
import SignIn from '../../components/SignIn/SignIn'

export const SignInView = () => {
  return (
    <div >
      <div className={styles.viewSign}>
         <SignIn className={styles.view}/> 
      </div>
        <About/>
    </div>
  )
}


