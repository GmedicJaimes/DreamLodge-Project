import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import UsersPanel from '../../../components/UserPanel/UserPanel';
import PropertiesPanel from '../../../components/PropertiesPanel/PropertiesPanel';

import styles from './Dashboard.module.css'

const Dashboard = ({ totalImages, totalProperties, totalUsers }) => {

  const [purchaseSize, setPurchaseSize] = useState(0);
  const [users, setUsers] = useState([]);  
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

  return(
    <div className={styles.dashContainer}>
      <div className={styles.cardsDash}>
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
      </div>
          
            {/* <UsersPanel users={users} handleDeleteUsers={handleDeleteUsers}/>
            <PropertiesPanel properties={allProperties} handleDeleteProperty={handleDeleteProperty}/> */}
    </div>
  )
}

export default Dashboard;