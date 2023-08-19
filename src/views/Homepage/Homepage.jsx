import React, { useEffect, useContext, useState } from "react";

import styles from "./Homepage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import {
  fetchFilteredProperties,
  sortPropertiesByPrice,
  getAllBookings,
  fetchAvailablePropertiesInRange,
  getPropertiesList
} from "../../config/handlers";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import { listAll } from "firebase/storage";
import { Firestore, collection, getDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { ref } from "firebase/storage";
import DashboardAdmin from "../Dashboard/DashboardAdmin";
import Calendar from "../../components/Calendar/Calendar";
import { DateContext } from "../../Contex/DateContex";
import SideFilters from "../../components/SideFilters/SideFilters";

const Homepage = ({ host, setHost, originalHost, setOriginalHost }) => {
  const [allProperties, setAllProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [ascending, setAscending] = useState(true);
  const { startDate, endDate, setDateRange } = useContext(DateContext);

  const [guest, setGuest] = useState(0);
  const [rooms, setRooms] = useState(0);

  const [hasMore, setHasMore] = useState(true); // Estado para controlar si hay más elementos a cargar en el scroll infinito

  
  const handleRoomsChange = (value) => {
    setRooms(value);
  };

  const handleGuestChange = (value) => {
    setGuest(value);
  };

  const handleStartDateChange = async (date) => {
    setDateRange(date, endDate);
    if (endDate) {
      const availableProperties = await fetchAvailablePropertiesInRange(date, endDate);
      setHost(availableProperties);
    }
  };

  const handleEndDateChange = async (date) => {
    setDateRange(startDate, date);
    if (startDate) {
      const availableProperties = await fetchAvailablePropertiesInRange(startDate, date);
      setHost(availableProperties);
    }
  };

  useEffect(() => {
    const filters = {
      guest: guest,
      rooms: rooms,
    };

    async function fetchFilteredHost() {
      const filteredHost = await fetchFilteredProperties(filters);
      setHost(filteredHost);
    }

    fetchFilteredHost();
  }, [guest, rooms]);

  useEffect(() => {
    async function fetchAndUpdateHost() {
      if (!allProperties.length) {
        const propertiesCollectionRef = collection(db, "properties");
        const propertiesSnapshot = await getDocs(propertiesCollectionRef);
        const properties = propertiesSnapshot.docs.map(doc => doc.data());
  
        setAllProperties(properties);
      }
  
      let filteredHost = [...allProperties];
  
      if (rooms) {
        filteredHost = filteredHost.filter(
          (host) => host.stances && host.stances.rooms === Number(rooms)
        );
      }
  
      if (guest) {
        filteredHost = filteredHost.filter((property) => {
          return property.stances && property.stances.guest === Number(guest);
        });
      }
  
      setHost(filteredHost);
    }
  console.log(host,"desde hompeage")
    fetchAndUpdateHost();
  }, [guest, rooms, allProperties]);
  

  // Función para manejar el ordenamiento por precio
  const handleSortByPrice = () => {
    // Clona la lista de propiedades del estado "host" para evitar copiar el estado directamente
    const sortedProperties = sortPropertiesByPrice([...host], ascending);

     // Actualiza el estado "host" con las propiedades ordenadas por precio
    setHost(sortedProperties);
    // Invierte el valor de "ascending" para alternar entre ascendente y descendente
    setAscending(!ascending);
  };

  // const handleScrollInfinite = async () => {
  //   try {
  //     const propertiesPerPage = 8;
  //     const currentPage = Math.floor(host.length / propertiesPerPage) + 1;
  
  //     const additionalProperties = await getPropertiesList(
  //       currentPage,
  //       propertiesPerPage
  //     );
  
  //     if (additionalProperties.length === 0) {
  //       setHasMore(false);
  //     } else {
  //       setHost((prevHost) => [...prevHost, ...additionalProperties]);
  //     }
  //   } catch (error) {
  //     console.error("Error loading more properties:", error);
  //   }
  // };

  return (
    <div>
      <div className={styles.containerHome}>
        <Filters
          setHost={setHost}
          originalHost={originalHost}
          filteredHost={host} // Pasar el arreglo host filtrado
          handleSortByPrice={handleSortByPrice}
          ascending={ascending}
        />

        <div className={styles.containerSections}>
          <aside className={styles.aside}>
          <Calendar
            guest={guest}
            rooms={rooms}
            onGuestChange={handleGuestChange}
            onRoomsChange={handleRoomsChange}
            onStartChange={handleStartDateChange}
            onEndChange={handleEndDateChange}
            className={styles.calendar}
          />
          <SideFilters
          setHost={setHost}
          originalHost={originalHost}
          filteredHost={host} // Pasar el arreglo host filtrado
          handleSortByPrice={handleSortByPrice}
          ascending={ascending}
        />
          </aside>
          {/* <button onClick={handleAvailableProperties}>Available Lodgings</button> */}
          <section className={styles.calendarHome}>
          {/* <InfiniteScroll
          dataLength={host.length}
          next={handleScrollInfinite}
          hasMore={hasMore} // Controla si hay más elementos para cargar
          loader={<SkeletonCard />} > */}
            <div className={styles.skeletonContainer}>
              {/* {loading ? (
                Array.from({ length: host.length || 12 }).map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))
              ) : ( */}
              <Cards host={host} />
                {/* )}   */}
            </div>
            {/* {host.map((property) => (
        <PropertyComponent key={property.id} property={property} />
      ))}  */}
        {/* </InfiniteScroll> */}
        </section>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
