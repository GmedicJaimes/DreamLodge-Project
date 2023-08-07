import Filters from "../../components/Filters/Filters"
import Cards from "../../components/Cards/Cards"

// import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
// import { getAllProperties } from "../../redux/actions"

import styles from "./Homepage.module.css"

import InfiniteScroll from 'react-infinite-scroll-component'

const Homepage = () => {

    // const dispatch = useDispatch()

    // const allProperties = useSelector( (state) => state.allProperties)

    const [host, setHost] = useState([])
    const [page, setPage] = useState(1)

    // useEffect(() => {
    //   // dispatch(getAllProperties())
    //     // dispatch(setPage(getAllProperties()))
    // }, [dispatch, page])


    return(
      <InfiniteScroll dataLength={host.length} hasMore={true} next={() => setPage((prevPage) => prevPage + 1)}>
        <div>
            <div className={styles.containerHome}>
                <Filters/>
                {/* <Cards allProperties={allProperties}/> */}
            </div>
        </div>
      </InfiniteScroll>
        
    )
}

export default Homepage