import React, { useContext, useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import { getAvailableProperties, sortPropertiesByPrice, getPropertiesList } from "../../config/handlers";
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard'

const Homepage = ({host, setHost, originalHost}) => {
  // const [host, setHost] = useState([]);
  // const [page, setPage] = useState(1);
  // const [originalHost, setOriginalHost] = useState([]);
  const [ascending, setAscending] = useState(true); // Estado para controlar el orden ascendente/descendente
  const [loading, setLoading] = useState(true);
  // const [totalProperties, setTotalProperties] = useState(0);
  // const [totalUsers, setTotalUsers] = useState(0);
  // const [totalImages, setTotalImages] = useState(0);

  // useEffect(() => {
  //   async function fetchProperties() {
  //     try {
  //       const properties = await getPropertiesList();
  //       setOriginalHost(properties);
  //       setHost(properties);
  //       setTotalProperties(properties.length);

  //       const usersSnapshot = await getDocs(collection(db, 'users'));
  //       setTotalUsers(usersSnapshot.size);
  //       console.log(usersSnapshot);

  //       const imagesSnapshot = await listAll(imageUrlRef);
  //       setTotalImages(imagesSnapshot.items.length);
  //       console.log(imagesSnapshot);
  //     } catch (error) {
  //       console.error("Error fetching properties:", error);
  //     } finally {
  //       setLoading(false); // Finalizado el proceso, establece loading en false
  //     }
  //   }
  //   fetchProperties();
  // }, []);

  const handleAvailableProperties = async () => {
    const availableProperties = await getAvailableProperties();
  

  const loadMoreProperties = async () => {
    // Simulamos una carga demorada para dar tiempo a ver el efecto
    setTimeout(async () => {
      const propertiesPerPage = 8; // Número de propiedades por página
      const currentPage = Math.floor(host.length / propertiesPerPage) + 1;

      // Obtener propiedades adicionales según la página actual
      const additionalProperties = await getPropertiesList(
        currentPage,
        propertiesPerPage
      );

      // Si no hay más propiedades para cargar, desactivamos el scroll infinito
      if (additionalProperties.length === 0) {
        setHasMore(false);
      } else {
        setHost((prevHost) => [...prevHost, ...additionalProperties]);
      }
    }, 500); //  ajustar el tiempo
  };



  const handleSortByPrice = () => {
    const sortedProperties = sortPropertiesByPrice(host, ascending);
    setHost(sortedProperties);
    setAscending(!ascending);
  };
  console.log(host)
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
  );
};
};
export default Homepage;

