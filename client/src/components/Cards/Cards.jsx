
import Card from "./Card/Card"
import styles from "./Cards.module.css"

const Cards = ({allProperties}) => {

    return(
        <div className={styles.container}>
            {
                allProperties?.map((property)=> (
                    <Card property={property} key={property.id}/>
                ))
            }
        </div>
    )
}

export default Cards;