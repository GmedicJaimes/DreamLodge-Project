import Filters from "../../components/Filters/Filters"
import Cards from "../../components/Cards/Cards"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getAllProperties } from "../../redux/actions"

import styles from "./Homepage.module.css"

const Homepage = () => {

    const dispatch = useDispatch()

    const allProperties = useSelector( (state) => state.allProperties)

    const [offset, setOffset] = useState(0)

    // useEffect(() => {
    //     dispatch(getAllProperties())
    // }, [dispatch])


    useEffect(() => {

      dispatch(getAllProperties(offset))


      const handleScroll = (event) => {
        const scrollHeight = event.target.documentElement.scrollHeight
        const currentHeight = event.target.documentElement.scrollHeight + window.innerHeight
        if(currentHeight + 1 >= scrollHeight){
          setOffset(offset + 4)
        }
      }
      
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
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