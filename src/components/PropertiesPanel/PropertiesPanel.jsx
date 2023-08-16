import React from 'react';


const PropertiesPanel = ({ properties, handleDeleteProperty }) => {
  return (
    <div>
      <h2>Propiedades:</h2>
      {properties.length > 0 && (
        <div>
          <ul>
            {properties.map((property) => (
              <li key={property.id}>
                <div>
                  <p>Nombre: {property.name}</p>
                  <p>Dirección: {property.location.address}</p>
                  <p>Ciudad: {property.location.city}</p>
                  <p>Estado: {property.location.state}</p>
                  <p>ID Usuario: {property.userId}</p>
                  <p>Tipo: {property.type}</p>
                </div>
                <button
                  onClick={() => handleDeleteProperty(property.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
