import React from 'react'
import Login from "../../components/Login/Login"
import SearchBar from "../../components/SearchBar/SearchBar"
import SingIn from "../../components/SingIn/SingIn"

import style from './Navbar.module.css'


export const Navbar: React.FC = () => {
  return(
    <div className={style.containerNavbar}>
      <div className={style.Logo}>
        {/* <img src="" alt="" /> */}
        <h1>Logo</h1>
      </div>

      <SearchBar/>
      
      <div className={style.user}>
        <Login/>
        <SingIn/>
      </div>
    </div>
  )
}
