import styles from "./Filters.module.css"

const Filters = () => {

    return(
        <div className={styles.container}>
            <button>CABINS</button>
            <button>BEACHFRONT</button>
            <button>MANSIONS</button>
            <button>COUNTRYSIDE</button>
            <button>ROOMS</button>
        </div>
    )
}

export default Filters