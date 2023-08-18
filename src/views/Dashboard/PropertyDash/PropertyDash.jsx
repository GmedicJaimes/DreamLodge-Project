import { useEffect, useState } from "react";
import PropertiesPanel from "../../../components/PropertiesPanel/PropertiesPanel";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';

const PropertyDash = () => {

  const [allProperties, setAllProperties] = useState([])

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const propertiesRef = collection(db, 'properties');
        const querySnapshot = await getDocs(propertiesRef);
        const properties = querySnapshot.docs.map(doc => doc.data());
        setAllProperties(properties);
      } catch (error) {
        console.error('Error al obtener todas las propiedades:', error);
      }
    };
    fetchAllProperties();
  })

  const handleDeleteProperty = async (propertyId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar esta propiedad?');
    if (confirmDelete) {
      try {
       
        const propertyRef = db.collection('properties').doc(propertyId);
  
 
        await propertyRef.update({ deleted: true });
  
       
        setFilteredProperties(prevProperties =>
          prevProperties.filter(property => property.id !== propertyId)
        );
  
        console.log(`Propiedad con ID ${propertyId} borrada lógicamente.`);
      } catch (error) {
        console.error('Error al borrar la propiedad:', error);
      }
    }
  };


  return(
    <div>
      <PropertiesPanel properties={allProperties} handleDeleteProperty={handleDeleteProperty}/>
      <h1>Estamos en el Profit perros</h1>
    </div>
  )
}

export default PropertyDash;