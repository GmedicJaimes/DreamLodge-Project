import styles from "./Homepage.module.css"
import { useDispatch, useSelector } from "react-redux"
import Cards from "../../components/Cards/Cards"
import {useEffect} from "react"
import { getAllProperties } from "../../redux/actions"
import Filters from "../../components/Filters/Filters"

const Homepage = () => {

    const dispatch = useDispatch()

    const {
        allProperties
    } = useSelector( state => state)

    useEffect(() => {
        dispatch(getAllProperties())
    }, [dispatch])

    return(
        <div>
<<<<<<< HEAD
            <Filters/>
            <Cards allProperties={allProperties}/>
=======
            <div className={styles.container}>
                <Filters/>
                <Cards/>
            </div>
>>>>>>> 1dd07b92211fba0a0f2073e9565cd3a313cd5955
        </div>
    )
}

export default Homepage