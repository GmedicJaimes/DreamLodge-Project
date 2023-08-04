import styles from "./Filters.module.css"

const Filters = () => {

    return(
        <div className={styles.container}>
            <div className={styles.filterContainer}>
                <button className={styles.btn}>CABINS</button>
                <button className={styles.btn}>BEACHFRONT</button>
                <button className={styles.btn}>MANSIONS</button>
                <button className={styles.btn}>COUNTRYSIDE</button>
                <button className={styles.btn}>ROOMS</button>
            </div>
        </div>
    )
}

export default Filters