
import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
// import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import { getPropertiesList, getAvailableProperties } from "../../config/handlers";

const Homepage = () => {
  const [host, setHost] = useState([]);
  // const [page, setPage] = useState(1);
  const [originalHost, setOriginalHost] = useState([]);

  // useEffect(() => {
  //   // Esta función obtiene las propiedades y actualiza el estado 'host'
  //   async function fetchProperties() {
  //     const properties = await getPropertiesList();
  //     setHost(properties);
  //   }
  //   fetchProperties();
  // }, []);

  useEffect(() => {
    async function fetchProperties() {
      const properties = await getPropertiesList();
      setOriginalHost(properties);
      setHost(properties);
    }
    fetchProperties();
  }, []);

  const handleAvailableProperties = async () => {
    const availableProperties = await getAvailableProperties();

    if (availableProperties.length === 0) {
      console.log("No hay propiedades disponibles");
    } else {
      setHost(availableProperties);
    }
  };

  console.log("Propiedades en Homepage:", host);

  return (
    // <InfiniteScroll
    //   dataLength={host.length}
    //   hasMore={true}
    //   next={() => setPage((prevPage) => prevPage + 1)}
    // >
      <div>
        <div className={styles.containerHome}>
          <Filters setHost={setHost} originalHost={originalHost} />
          <button onClick={handleAvailableProperties}>Available Lodgings</button>
          {/* Pasamos 'host' como prop al componente 'Cards' */}
          <Cards host={host} />
        </div>
      </div>
  //   </InfiniteScroll>
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