import Filters from "../../components/Filters/Filters"
import Cards from "../../components/Cards/Cards"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllProperties } from "../../redux/actions"

import styles from "./Homepage.module.css"

const Homepage = () => {

    const dispatch = useDispatch()

    const allProperties = useSelector( (state) => state.allProperties)

    useEffect(() => {
        dispatch(getAllProperties())
    }, [dispatch])


    return(
        <div>
            <div className={styles.containerHome}>
                <Filters/>
                <Cards allProperties={allProperties}/>
            </div>
        </div>
    )
}

export default Homepage