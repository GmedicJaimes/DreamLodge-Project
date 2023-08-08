
import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import { getPropertiesList } from "../../firebase/handlers.js";

const Homepage = () => {
  const [host, setHost] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Esta función obtiene las propiedades y actualiza el estado 'host'
    async function fetchProperties() {
      const properties = await getPropertiesList();
      setHost(properties);
    }
    fetchProperties();
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={host.length}
      hasMore={true}
      next={() => setPage((prevPage) => prevPage + 1)}
    >
      <div>
        <div className={styles.containerHome}>
          <Filters />
          {/* Pasamos 'host' como prop al componente 'Cards' */}
          <Cards allProperties={host} />
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default Homepage;























/* import Filters from "../../components/Filters/Filters"
import Cards from "../../components/Cards/Cards"

// import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
// import { getAllProperties } from "../../redux/actions"

import styles from "./Homepage.module.css"

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
        <div>
            <div className={styles.containerHome}>
                <Filters/>
                <Cards allProperties={allProperties}/> 
            </div>
        </div>
    )
}

export default Homepage */