import { Link } from "react-router-dom"
import Searchbar from "./Searchbar/Searchbar"
// import style from "./Navbar.module.css"

const Navbar = () => {
    return(
        <div>
            <Link>Home</Link>
            <Searchbar/>
        </div>
    )
}

export default Navbar