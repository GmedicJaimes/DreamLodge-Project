import styles from "./Dropdown.module.css"
import user from "../../assets/usuario.png"
import settings from "../../assets/ajustes.png"
import logout from "../../assets/logout.png"
import msg from "../../assets/mensaje.png"
import help from "../../assets/informacion.png"
import edit from "../../assets/editar.png"
import posteito from "../../assets/postLodge.png"
import React from "react"
import { logOut } from "../../config/handlers"
import { Link } from "react-router-dom"
import { auth } from "../../config/firebase";


const Dropdown = () => {

    const [open, setOpen] = React.useState(false)
    const [ liveUser, setLiveUser ] = React.useState({})

    React.useEffect(() => {
        if(!liveUser.auth){
            setLiveUser(auth.currentUser)
            console.log(auth.currentUser);
        }
    }, [])

    const closeMenu = () => {
        setOpen(false);
      };

      const toggleMenu = () => {
        setOpen(!open);
      };

    return(
        <div className={styles.menuContainer}>
            <div className={styles.menuTrigger} onClick={toggleMenu}>
                <img src={user} alt="" />
            </div>
            <div className={`${styles.dropdownMenu} ${open ? styles.active : styles.inactive}`}>
                <h3>{liveUser?.auth?.currentUser.displayName}<br/>
                <span>{liveUser?.auth?.currentUser.email}</span></h3>
                <ul>
                    <Link to={`user/${liveUser?.auth?.currentUser.uid}`}>
                        <DropDownItem img={user} text={"My Profile"} onClick={closeMenu}/>
                    </Link>
                    <Link to={`/config/${liveUser?.auth?.currentUser.uid}`}>
                        <DropDownItem img={edit} text={"Edit Profile"} onClick={closeMenu}/>
                    </Link>
                    <Link to={`/tutorial`}>
                        <DropDownItem img={posteito} text={"Post Lodge"} onClick={closeMenu}/>
                    </Link>
                    {/* <DropDownItem img={msg} text={"Inbox"}/>
                    <DropDownItem img={settings} text={"Settings"}/>
                    <DropDownItem img={help} text={"Help"}/> */}
                    <DropDownItem img={logout} onClick={logOut} text={"Log out"}/>
                </ul>
            </div>
        </div>
    )
}

const DropDownItem = ( props ) => {
    return(
        <li className={styles.dropDownItem} onClick={props?.onClick}>
            <img src={props.img} alt="" />
            <a>{props.text}</a>
        </li>
    )
}

export default Dropdown