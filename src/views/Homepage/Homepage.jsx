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
  getPropertiesList,
  isPropertyAvailable
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
import landingImg from "../../assets/landingImg.jpeg"

const Homepage = ({ host, setHost, originalHost, setOriginalHost }) => {
  const [allProperties, setAllProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  // console.log(host)
  const [ascending, setAscending] = useState(true);
  const { startDate, endDate, setDateRange } = useContext(DateContext);
  const [loading, setLoading] = useState(true); // Agrega el estado de carga


  const [guest, setGuest] = useState(0);
  const [rooms, setRooms] = useState(0);

  //estado local para paginado
  const [currentPage, SetCurrentPage] = useState(1);

  const [propertyTypeFilter, setPropertyTypeFilter] = useState(null);

  const [stateFilter, setStateFilter] = useState(null);

  const [cityFilter, setCityFilter] = useState(null);

  const handleStateFilter = (value)=>{
    setStateFilter(value);
    SetCurrentPage(1)
    
  };

  const handleCityFilter = (value) => {
    setCityFilter(value)
    SetCurrentPage(1)
  };

  const handlePropertyTypeFilterChange = (value) => {
    setPropertyTypeFilter(value);
    SetCurrentPage(1)
  };

  const handleRoomsChange = (value) => {
    setRooms(value);
    SetCurrentPage(1)
  };

  const handleGuestChange = (value) => {
    setGuest(value);
    SetCurrentPage(1)
  };

  const handleStartDateChange = async (date) => {
    setDateRange(date, endDate);
    if (endDate) {
      const availableProperties = await fetchAvailablePropertiesInRange(date, endDate);
      setHost(availableProperties);
    }
    SetCurrentPage(1)
  };


  const handleEndDateChange = async (date) => {
    setDateRange(startDate, date);
    if (startDate) {
      const availableProperties = await fetchAvailablePropertiesInRange(startDate, date);
      setHost(availableProperties);
    }
    SetCurrentPage(1)
  };

  useEffect(() => {
    setLoading(true);
    const filters = {
      guest: guest,
      rooms: rooms,
      propertyType: propertyTypeFilter,
      stateFilter: stateFilter,
      cityFilter: cityFilter
    };

    async function fetchFilteredHost() {
      const filteredHost = await fetchFilteredProperties(filters);
      setLoading(false); // Set loading to false only after data is fetched
      setHost(filteredHost);


    }

    fetchFilteredHost();
  }, [guest, rooms, propertyTypeFilter, stateFilter, cityFilter]);

  

  useEffect(() => {
    async function fetchAndUpdateHost() {
      if (!host.length) {
        const propertiesCollectionRef = collection(db, "properties");
        const propertiesSnapshot = await getDocs(propertiesCollectionRef);
        const properties = propertiesSnapshot.docs.map(doc => doc.data());
  
        setHost(properties);
      }
  
      let filteredHost = [...host];
  
      if (rooms) {
        filteredHost = filteredHost.filter(
          (host) => host.stances && host.stances.rooms == Number(rooms)
        );
      }
  
      if (guest) {
        filteredHost = filteredHost.filter((property) => {
          return property.stances && property.stances.guest == Number(guest);
        });
      }
  
      setHost(filteredHost);
    }
  // console.log(host,"desde hompeage")
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


  return (
    <div>
      <div className={styles.containerHome}>
        {/* <Filters
          setHost={setHost}
          originalHost={originalHost}
          filteredHost={host} // Pasar el arreglo host filtrado
          handleSortByPrice={handleSortByPrice}
          ascending={ascending}
        /> */}
        <div className={styles.headerHomePage}>
            <img src={landingImg} alt="" srcset="" />
        </div>
        <div className={styles.containerSections}>
          <aside className={styles.aside}>
          <Calendar
            guest={guest}
            rooms={rooms}
            propertyTypeFilter={propertyTypeFilter}
            stateFilter={stateFilter}
            cityFilter={cityFilter}
            onGuestChange={handleGuestChange}
            onRoomsChange={handleRoomsChange}
            onStartChange={handleStartDateChange}
            onEndChange={handleEndDateChange}
            onPropertyTypeFilterChange={handlePropertyTypeFilterChange}
            onStateChange={handleStateFilter}
            onCityChange={handleCityFilter}
            sortByPrice={handleSortByPrice}
            ascending={ascending}
          />
          {/* <SideFilters
          setHost={setHost}
          originalHost={originalHost}
          filteredHost={host} // Pasar el arreglo host filtrado
          handleSortByPrice={handleSortByPrice}
          ascending={ascending}
        /> */}
          </aside>

          {/* <button onClick={handleAvailableProperties}>Available Lodgings</button> */}
          <section className={styles.calendarHome}>
  <div className={styles.skeletonContainer}>
    {loading ? (
      Array.from({ length: host.length || 12 }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))
    ) : (
      host.length > 0 ? (
        <Cards host={host} />
      ) : null
    )}
  </div>
  
    <p className={host.length === 0 ? styles.errorMessageEmpty : styles.errorMessage}>
      Sorry, no properties are available with those search criteria.
    </p>


</section>




        </div>
      </div>
    </div>
  );
};


export default Homepage;


//Sorry, no properties are available with those search criteria.
