import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
// import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import { getAvailableProperties, sortPropertiesByPrice, getPropertiesList } from "../../config/handlers";
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard'
import { listAll } from "firebase/storage";
import { Firestore, collection, getDoc, getDocs } from "firebase/firestore";
import {db, storage} from '../../config/firebase'
import { ref } from "firebase/storage";
import DashboardAdmin from "../Dashboard/DashboardAdmin";
import Calendar from "../../components/Calendar/Calendar";



const Homepage = ({host, setHost, originalHost, setOriginalHost}) => {
  const [ascending, setAscending] = useState(true); // Estado para controlar el orden ascendente/descendente
  const [loading, setLoading] = useState(true);
  

//   const handleAvailableProperties = async () => {
//     const availableProperties = await getAvailableProperties();
  
//     if (availableProperties.length === 0) {
//       console.log("No hay propiedades disponibles");
//     } else {
//       setHost(availableProperties);
//       setHasMore(false); // Desactiva el scroll infinito al aplicar filtros
//     }
//   };
//   const filteredHost = await fetchFilteredProperties(filters);
//   console.log("FILTERED HOST GUEST" ,filteredHost)
//   setHost(filteredHost);
//   console.log(" HOST GUEST" ,filteredHost)

// };




const handleChildChange = (value) => {
  setChild(value);
};

const handleRoomsChange = async (value) => {
  setRooms(value);
  const filters = {
    guest: guest,
    rooms: value,
    startDate: startDate,
    endDate: endDate
  };
  const filteredHost = await fetchFilteredProperties(filters);
  console.log("FILTERED HOST ROOM" ,filteredHost)
  setHost(filteredHost);
  console.log("FILTERED ROOM" ,filteredHost)

};


// const handleStartDateChange = async (date) => {
//   setDateRange(date, endDate);

//   if (endDate) {
//     const properties = await fetchAvailablePropertiesInRange(date, endDate);
    
//     setHost(properties);
//     // Si necesitas enviar estas propiedades al componente padre o hacer algo más con ellas, hazlo aquí
//   }      
// };

// const handleEndDateChange = async (date) => {
//   setDateRange(startDate, date);

//   if (startDate) {
//     const properties = await fetchAvailablePropertiesInRange(startDate, date);
//     setHost(properties);
//     // Si necesitas enviar estas propiedades al componente padre o hacer algo más con ellas, hazlo aquí
//   }
// };
// useEffect(() => {
//   // Llamada a fetchFilteredProperties cuando guest cambia
//   const filters = {
//     guest: guest,
//     rooms: rooms,
//     startDate: startDate,
//     endDate: endDate
//   };

//   async function fetchFilteredHost() {
//     const filteredHost = await fetchFilteredProperties(filters);
//     setHost(filteredHost);
//   }

//   fetchFilteredHost();
// }, [guest, rooms, startDate, endDate]);

//   useEffect(() => {
//     async function fetchProperties() {
//       try {
//         const properties = await getPropertiesList();
//         setOriginalHost(properties);
//         setHost(properties);
//         console.log(properties)
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       } finally {
//         setLoading(false); // Finalizado el proceso, establece loading en false
//       }
//     }
//     fetchProperties();
//   }, []);
  

  // const loadMoreProperties = async () => {
  //   // Simulamos una carga demorada para dar tiempo a ver el efecto
  //   setTimeout(async () => {
  //     const propertiesPerPage = 8; // Número de propiedades por página
  //     const currentPage = Math.floor(host.length / propertiesPerPage) + 1;

  //     // Obtener propiedades adicionales según la página actual
  //     const additionalProperties = await getPropertiesList(
  //       currentPage,
  //       propertiesPerPage
  //     );

  //     // Si no hay más propiedades para cargar, desactivamos el scroll infinito
  //     if (additionalProperties.length === 0) {
  //       setHasMore(false);
  //     } else {
  //       setHost((prevHost) => [...prevHost, ...additionalProperties]);
  //     }
  //   }, 500); //  ajustar el tiempo
  // };

  // const handleSortByPrice = () => {
  //   const sortedProperties = sortPropertiesByPrice(host, ascending);
  //   setHost(sortedProperties);
  //   setAscending(!ascending);
  // };

  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  const handleSortByPrice = () => {
    const sortedProperties = sortPropertiesByPrice([...originalHost], ascending);
    setHost(sortedProperties);
    setAscending(!ascending);
  };
  
  console.log(host)

  return (
    <div>
      <div className={styles.containerHome}>

        <Filters
          setHost={setHost}
          originalHost={originalHost}
          handleSortByPrice={handleSortByPrice}
          ascending={ascending}
        />

        <div className={styles.containerSections}>
          <aside className={styles.aside}>
            <Calendar className={styles.calendar}/>
          </aside>
          {/* <button onClick={handleAvailableProperties}>Available Lodgings</button> */}
          <section className={styles.calendarHome}>
            {/* <InfiniteScroll
            dataLength={host.length}
            next={loadMoreProperties}
            hasMore={hasMore} // Controla si hay más elementos para cargar
            loader={<SkeletonCard />} // Puedes mostrar un loader mientras se cargan más elementos
          > */}
            {/* Verifica si host está cargando, si es así, muestra el esqueleto */}
            <div className={styles.skeletonContainer}>
              {/* {loading ? (
                Array.from({ length: host.length || 12 }).map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))
              ) : ( */}
                <Cards host={host} />
              {/* )} */}
          </div>
          </section>
        </div>
        
        {/* </InfiniteScroll> */}
      </div>
    </div>
  )}

export default Homepage;