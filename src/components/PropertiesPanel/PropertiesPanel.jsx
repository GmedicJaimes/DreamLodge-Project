import style from './PropertiesPanel.module.css'



const PropertiesPanel = ({ properties, handleDeleteProperty }) => {
  return (
    <div className={style.propertyPanel}>
      <h2>Properties:</h2>
      {properties.length > 0 && (
        <div className={style.properListContainer}>
          <ul className={style.properList}>
            {properties.map((property) => (
              <li key={property.id} className={style.properListItem}>
                <div>
                  <p>Nombre: {property.name}</p>
                  <p>Dirección: {property.location.address}</p>
                  <p>Ciudad: {property.location.city}</p>
                  <p>Estado: {property.location.state}</p>
                  <span>ID Usuario: {property.userId}</span>
                  {/* <p>Tipo: {property.type}</p> */}
                </div>
                <button
                  onClick={() => handleDeleteProperty(property.id)} className={style.deleteButtonProper}>
                  <img src="https://cdn-icons-png.flaticon.com/128/657/657059.png" alt="" />
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
