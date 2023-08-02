import React from 'react'
import Login from "../../components/Login/Login"
import SearchBar from "../../components/SearchBar/SearchBar"
import SingIn from "../../components/SingIn/SingIn"
// import { Login } from "../Login/Login";


export const Navbar: React.FC = () => {
  return(
    <div>
      <div>
        <img src="" alt="" />
        <h1>Logo</h1>
      </div>

      <SearchBar/>
      <Login/>
      <SingIn/>
    </div>
  )
}
