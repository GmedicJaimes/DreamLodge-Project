import Filters from "../../components/Filters/Filters"
import Cards from "../../components/Cards/Cards"
import styles from "./Homepage.module.css"

const Homepage = () => {





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