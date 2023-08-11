<<<<<<< HEAD

=======
>>>>>>> ce6c7f290b22b88f64ceb0bd4a6406b3617a32c4
import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
// import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
<<<<<<< HEAD
import { getPropertiesList, getAvailableProperties } from "../../config/handlers";
=======
import { getPropertiesList, getAvailableProperties, sortPropertiesByPrice } from "../../config/handlers";
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard'


>>>>>>> ce6c7f290b22b88f64ceb0bd4a6406b3617a32c4

const Homepage = () => {
  const [host, setHost] = useState([]);
  // const [page, setPage] = useState(1);
  const [originalHost, setOriginalHost] = useState([]);
<<<<<<< HEAD
=======
  const [ascending, setAscending] = useState(true); // Estado para controlar el orden ascendente/descendente
  const [loading, setLoading] = useState(true);


>>>>>>> ce6c7f290b22b88f64ceb0bd4a6406b3617a32c4

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
<<<<<<< HEAD
      const properties = await getPropertiesList();
      setOriginalHost(properties);
      setHost(properties);
=======
      try {
        const properties = await getPropertiesList();
        setOriginalHost(properties);
        setHost(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false); // Finalizado el proceso, establece loading en false
      }
>>>>>>> ce6c7f290b22b88f64ceb0bd4a6406b3617a32c4
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

<<<<<<< HEAD
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
=======
  const handleSortByPrice = () => {
    const sortedProperties = sortPropertiesByPrice(host, ascending);
    setHost(sortedProperties);
    setAscending(!ascending);
  };

  return (
    // <InfiniteScroll
        //   dataLength={host.length}
        //   hasMore={true}
        //   next={() => setPage((prevPage) => prevPage + 1)}
        // >
    <div>
      <div className={styles.containerHome}>
        <Filters setHost={setHost} originalHost={originalHost} handleSortByPrice={handleSortByPrice} ascending={ascending} />
        <button onClick={handleAvailableProperties}>Available Lodgings</button>
  
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
        //   </InfiniteScroll>
  
  );
  
  };
>>>>>>> ce6c7f290b22b88f64ceb0bd4a6406b3617a32c4

export default Homepage;























<<<<<<< HEAD
=======







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


























>>>>>>> ce6c7f290b22b88f64ceb0bd4a6406b3617a32c4
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