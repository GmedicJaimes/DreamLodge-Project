import { Link } from "react-router-dom"
import styles from "./Card.module.css"


const Card = ({property}) => {
    const {name, price, description, image} = property
    return(
      <Link to={"/rooms"} className={styles.link}>
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={image} alt="" />
            </div>
            <section className={styles.info}>
                <h3>{name}</h3>
                <p>$ {price} USD</p>
                <p>{description}</p>

                    
            </section>
        </div>
      </Link>
    )
}

export default Card