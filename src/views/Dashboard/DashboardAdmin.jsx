import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import styles from '../Dashboard/Dashboard.module.css'
import UsersPanel from '../../components/UserPanel/UserPanel';
import PropertiesPanel from '../../components/PropertiesPanel/PropertiesPanel';

const DashboardAdmin = ({ totalImages, totalProperties, totalUsers }) => {
  const [purchaseSize, setPurchaseSize] = useState(0);
  const [users, setUsers] = useState([]);  
  const [allProperties, setAllProperties] = useState([]);
  

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
    const getPurchaseCount = async () => {
      try {
        const purchasesSnapshot = await getDocs(collection(db, 'purchases'));
        const totalPurchases = purchasesSnapshot.size;
        setPurchaseSize(totalPurchases);
      } catch (error) {
        console.error(error);
      }
    };
    getPurchaseCount();
    const getUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  

  }, []);

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
  const handleDeleteUsers = async (userId) => {
    const confirmDelete = window.confirm('¿Estas seguro de que deseas borrar este usuario?');
    if (confirmDelete) {
      try {
       
        const propertyRef = db.collection('users').doc(userId);
  
 
        await propertyRef.update({ deleted: true });
  
       
        setFilteredProperties(prevProperties =>
          prevProperties.filter(property => property.id !== propertyId)
        );
  
        console.log(`Usuario con ID ${userId} borrada lógicamente.`);
      } catch (error) {
        console.error('Error al borrar el usuario:', error);
      }
    }
  };
  

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardSection}>
        <h2>Total de Propiedades:</h2>
        <p>{totalProperties ? totalProperties : "No hay propiedades en la base de datos"}</p>
      </div>
      <div className={styles.dashboardSection}>
        <h2>Usuarios Registrados:</h2>
        <p>{totalUsers ? totalUsers : "No hay usuarios en al base de datos"}</p>
      </div>
      <div className={styles.dashboardSection}>
        <h2>Imagenes cargadas:</h2>
        <p>{totalImages ? totalImages : "No hay imagenes en la base de datos"}</p>
      </div>
      <div className={styles.dashboardSection}>
        <h2>Propiedades Rentadas:</h2>
        <p>{purchaseSize ? purchaseSize : "No se han rentado propiedades aun"}</p>
      </div>
      <div className={styles.dashboardSection}>
        <h2>Ganancias totales:</h2>
        <p>{purchaseSize ? purchaseSize : "$0"}</p>
      </div>
      <div className={styles.dashboardSection}>
        <h2>Ganancias netas:</h2>
        <p>{purchaseSize ? purchaseSize : "$0"}</p>
      </div>
        <UsersPanel users={users} handleDeleteUsers={handleDeleteUsers}/>
        <PropertiesPanel properties={allProperties} handleDeleteProperty={handleDeleteProperty}/>
    </div>
  );
};

export default DashboardAdmin;
