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
            <Filters/>
            <Cards allProperties={allProperties}/>
        </div>
    )
}

export default Homepage