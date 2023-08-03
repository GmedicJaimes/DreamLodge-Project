import { Link } from "react-router-dom"
import Searchbar from "./Searchbar/Searchbar"
import style from "./Navbar.module.css"

const Navbar = () => {
    return(
        <div classname={style.container}> 
            <Link to={"/home"}>Home</Link>
            
            <Searchbar/>
            
            <Link to={"/signin"}>Sign In</Link>
            <Link to={"/login"}>Login</Link>
        </div>
    )
}

export default Navbar