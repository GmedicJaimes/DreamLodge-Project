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
            <h1>Home</h1>
            <Filters/>
            <Cards/>
        </div>
    )
}

export default Homepage