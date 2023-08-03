import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from './Calendar';
import DestinationSelector from './DestinationSelector';

const SearchBar = () => {
  const dispatch = useDispatch();
  const destinations = useSelector((state) => state.destinations);

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState('');

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const handleDestinationChange = (destination) => {
    setSelectedDestination(destination);
  };

  const handleSearch = () => {
    // dispatch para enviar las selecciones de búsqueda al estado global!!!
    dispatch(setSearchFilters({
      checkInDate,
      checkOutDate,
      selectedDestination
    }));
  };

  return (
    <div>
      <h2>Search Options</h2>
      <Calendar
        label="Check-in"
        selectedDate={checkInDate}
        onDateChange={handleCheckInDateChange}
      />
      <Calendar
        label="Check-out"
        selectedDate={checkOutDate}
        onDateChange={handleCheckOutDateChange}
      />
      <DestinationSelector
        selectedDestination={selectedDestination}
        destinations={destinations}
        onDestinationChange={handleDestinationChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;


//cuando el cliente haga click en 