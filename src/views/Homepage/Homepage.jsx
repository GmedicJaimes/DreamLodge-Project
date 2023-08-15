import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
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

const imageUrlRef = ref(storage, 'properties/');

const Homepage = ({host, setHost, originalHost}) => {
 
  const [ascending, setAscending] = useState(true); // Estado para controlar el orden ascendente/descendente
  const [loading, setLoading] = useState(true);
  

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
  console.log(host)

  return (
    <div>
      <div className={styles.containerHome}>
        
        <Filters setHost={setHost} originalHost={originalHost} handleSortByPrice={handleSortByPrice} ascending={ascending} />
        {/* <button onClick={handleAvailableProperties}>Available Lodgings</button> */}
       
        {/* Verifica si host está cargando, si es así, muestra el esqueleto */}
        <div className={styles.skeletonContainer}>
          <Calendar/>
          {/* {loading ? (
            Array.from({ length: host.length || 12 }).map((_, idx) => <SkeletonCard key={idx} />)
          ) : ( */}
            <Cards host={host} />
          {/* )} */}
        </div>
  
      </div>
    </div>
  )};

export default Homepage;