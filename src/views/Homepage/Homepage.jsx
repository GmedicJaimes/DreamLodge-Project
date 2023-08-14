import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import { getAvailableProperties, sortPropertiesByPrice, getPropertiesList } from "../../config/handlers";
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard'

const Homepage = () => {
  const [host, setHost] = useState([]);
  // const [page, setPage] = useState(1);
  const [originalHost, setOriginalHost] = useState([]);
  const [ascending, setAscending] = useState(true); // Estado para controlar el orden ascendente/descendente
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchProperties() {
      try {
        const properties = await getPropertiesList();
        setOriginalHost(properties);
        setHost(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false); // Finalizado el proceso, establece loading en false
      }
    }
    fetchProperties();
  }, []);

  const handleAvailableProperties = async () => {
    const availableProperties = await getAvailableProperties();
  
    if (availableProperties.length === 0) {
      console.log("No hay propiedades disponibles");
    } else {
      setHost(availableProperties);
      setHasMore(false); // Desactiva el scroll infinito al aplicar filtros
    }
  };

  const handleSortByPrice = () => {
    const sortedProperties = sortPropertiesByPrice(host, ascending);
    setHost(sortedProperties);
    setAscending(!ascending);
  };

  return (
    <div>
      <div className={styles.containerHome}>
        <Filters setHost={setHost} originalHost={originalHost} handleSortByPrice={handleSortByPrice} ascending={ascending} />
        {/* <button onClick={handleAvailableProperties}>Available Lodgings</button> */}
       
        {/* Verifica si host está cargando, si es así, muestra el esqueleto */}
        <div className={styles.skeletonContainer}>
  {loading ? (
    Array.from({ length: host.length || 12 }).map((_, idx) => <SkeletonCard key={idx} />)
  ) : (
    <Cards host={host} />
  )}
</div>
      </div>
    </div>
  )};

export default Homepage;





























// import React, { useEffect, useState } from "react";
// import styles from "./Homepage.module.css";
// // import InfiniteScroll from "react-infinite-scroll-component";
// import Filters from "../../components/Filters/Filters";
// import Cards from "../../components/Cards/Cards";
// import { getPropertiesList, getAvailableProperties, sortPropertiesByPrice } from "../../config/handlers";
// import SkeletonCard from '../../components/SkeletonCard/SkeletonCard'



// const Homepage = () => {
//   const [host, setHost] = useState([]);
//   // const [page, setPage] = useState(1);
//   const [originalHost, setOriginalHost] = useState([]);
//   const [ascending, setAscending] = useState(true); // Estado para controlar el orden ascendente/descendente
//   const [loading, setLoading] = useState(true);



//   // useEffect(() => {
//   //   // Esta función obtiene las propiedades y actualiza el estado 'host'
//   //   async function fetchProperties() {
//   //     const properties = await getPropertiesList();
//   //     setHost(properties);
//   //   }
//   //   fetchProperties();
//   // }, []);

//   useEffect(() => {
//     async function fetchProperties() {
//       try {
//         const properties = await getPropertiesList();
//         setOriginalHost(properties);
//         setHost(properties);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       } finally {
//         setLoading(false); // Finalizado el proceso, establece loading en false
//       }
//     }
//     fetchProperties();
//   }, []);

//   const handleAvailableProperties = async () => {
//     const availableProperties = await getAvailableProperties();

//     if (availableProperties.length === 0) {
//       console.log("No hay propiedades disponibles");
//     } else {
//       setHost(availableProperties);
//     }
//   };

//   const handleSortByPrice = () => {
//     const sortedProperties = sortPropertiesByPrice(host, ascending);
//     setHost(sortedProperties);
//     setAscending(!ascending);
//   };

//   return (
//     // <InfiniteScroll
//         //   dataLength={host.length}
//         //   hasMore={true}
//         //   next={() => setPage((prevPage) => prevPage + 1)}
//         // >
//     <div>
//       <div className={styles.containerHome}>
//         <Filters setHost={setHost} originalHost={originalHost} handleSortByPrice={handleSortByPrice} ascending={ascending} />
//         <button onClick={handleAvailableProperties}>Available Lodgings</button>
  
//         {/* Verifica si host está cargando, si es así, muestra el esqueleto */}
//         <div className={styles.skeletonContainer}>
//   {loading ? (
//     Array.from({ length: host.length || 10 }).map((_, idx) => <SkeletonCard key={idx} />)
//   ) : (
//     <Cards host={host} />
//   )}
// </div>
//       </div>
//     </div>
//         //   </InfiniteScroll>
  
//   );
  
//   };

// export default Homepage;


























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