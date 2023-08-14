import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import { getPropertiesList, getAvailableProperties, sortPropertiesByPrice } from "../../config/handlers";
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard'

const Homepage = () => {
  const [host, setHost] = useState([]);
  // const [page, setPage] = useState(1);
  const [originalHost, setOriginalHost] = useState([]);
  const [ascending, setAscending] = useState(true); // Estado para controlar el orden ascendente/descendente
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // Agrega esta línea para definir el estado hasMore


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

  
  // const loadMoreProperties = async () => {
  //   // Simulamos una carga demorada para dar tiempo a ver el efecto
  //   setTimeout(async () => {
  //     const propertiesPerPage = 8; // Número de propiedades por página
  //     const currentPage = Math.floor(host.length / propertiesPerPage) + 1;
  
  //     // Obtener propiedades adicionales según la página actual
  //     const additionalProperties = await getPropertiesList(currentPage, propertiesPerPage);
  
  //     // Si no hay más propiedades para cargar, desactivamos el scroll infinito
  //     if (additionalProperties.length === 0) {
  //       setHasMore(false);
  //     } else {
  //       setHost((prevHost) => [...prevHost, ...additionalProperties]);
  //     }
  //   }, 500); //  ajustar el tiempo
  // };
  


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
        <button onClick={handleAvailableProperties}>Available Lodgings</button>
        {/* <InfiniteScroll
          dataLength={host.length}
          next={loadMoreProperties}
          hasMore={hasMore} // Controla si hay más elementos para cargar
          loader={<SkeletonCard />} // Puedes mostrar un loader mientras se cargan más elementos 
          > */}
        {/* Verifica si host está cargando, si es así, muestra el esqueleto */}
        <div className={styles.skeletonContainer}>
  {loading ? (
    Array.from({ length: host.length || 12 }).map((_, idx) => <SkeletonCard key={idx} />)
  ) : (
    <Cards host={host} />
  )}
</div>
{/* </InfiniteScroll> */}
      </div>
    </div>
  )};

export default Homepage;