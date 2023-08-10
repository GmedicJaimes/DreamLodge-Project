import React, { createContext, useContext, useState, useEffect } from 'react';

const PropertiesContext = createContext();

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Llama a la función getPropertiesList o cualquier otra función para obtener la lista de propiedades
    // y luego actualiza el estado con setProperties
  }, []);

  return (
    <PropertiesContext.Provider value={properties}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function usePropertiesList() {
  return useContext(PropertiesContext);
}
