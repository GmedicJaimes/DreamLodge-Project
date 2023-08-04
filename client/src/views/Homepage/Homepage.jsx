import styles from "./Homepage.module.css"
import { useDispatch, useSelector } from "react-redux"
import Cards from "../../components/Cards/Cards"
import {useEffect} from "react"
import { getAllProperties } from "../../redux/actions"
import Filters from "../../components/Filters/Filters"
import React from 'react';


const Homepage = () => {

    const dispatch = useDispatch()

    const {
        allProperties
    } = useSelector( (state) => state)

    useEffect(() => {
        dispatch(getAllProperties())
    }, [dispatch])

    return(
        <div>
            <div className={styles.container}>
                <Filters/>
                <Cards allProperties={allProperties}/>
            </div>
        </div>
    )
}

export default Homepage