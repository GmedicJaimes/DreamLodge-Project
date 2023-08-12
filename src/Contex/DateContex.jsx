import React, { createContext, useState } from 'react';

// Crear el contexto
export const DateContext = createContext();

// Crear el componente proveedor del contexto
export const DateProvider = ({ children }) => {
  
    // Estado para almacenar las fechas de inicio y fin
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


    // Función para establecer el rango de fechas
  const setDateRange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

    // Proporcionar el contexto y los valores a los componentes hijos 
  return (
    <DateContext.Provider value={{ startDate, endDate, setDateRange }}>
      {children}
    </DateContext.Provider>
  );
};