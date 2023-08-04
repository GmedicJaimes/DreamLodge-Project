import styles from "./Homepage.module.css"
import { useDispatch, useSelector } from "react-redux"
import Cards from "../../components/Cards/Cards"
import {useEffect} from "react"
import { getAllProperties } from "../../redux/actions"
import Filters from "../../components/Filters/Filters"

const Homepage = () => {

    const dispatch = useDispatch()

    const {
        allPropertys
    } = useSelector( state => state)

    useEffect(() => {
        dispatch(getAllProperties())
    }, [dispatch])

    return(
        <div>
            <div className={styles.container}>
                <Filters/>
                <Cards/>
            </div>
        </div>
    )
}

export default Homepage