import React, { useEffect, useContext, useState } from "react";

import styles from "./Homepage.module.css";
// import InfiniteScroll from "react-infinite-scroll-component";
import Filters from "../../components/Filters/Filters";
import Cards from "../../components/Cards/Cards";
import {
  fetchFilteredProperties,
  sortPropertiesByPrice,
  getAllBookings,
  fetchAvailablePropertiesInRange,
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
  

  const handleSortByPrice = () => {
    const sortedProperties = sortPropertiesByPrice([...host], ascending);
    setHost(sortedProperties);
    setAscending(!ascending);
  };

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
               {/* )}  */}
            </div>
          </section>
        </div>

        {/* </InfiniteScroll> */}
      </div>
    </div>
  );
};

export default Homepage;
