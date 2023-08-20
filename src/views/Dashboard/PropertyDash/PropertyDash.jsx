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
    const confirmDelete = swal({
      title: 'Delet Property', 
      text:'Are you sure you want to delete this property?', 
      icon:'warning', 
      buttons: {
        cancel: {
          text: 'Nope',
          value: false,
          visible: true,
        },
        confirm: {
          text: 'Delete ',
          value: true,
          visible: true,
        },
      }, 
      dangerMode: true
      
    }).then(respuesta => {
      if(respuesta){
        swal({
          text: 'The property has been deleted successfully',
          icon: 'success',
          buttons: {
            confirm: {
              text: 'Ok ',
              value: true,
              visible: true,
            },
          },
          dangerMode: true
        })
      }
    });
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
    </div>
  )
}

export default PropertyDash;