import Filters from "../../components/Filters/Filters"
import Cards from "../../components/Cards/Cards"


import { useEffect } from "react"


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