import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import styles from '../Dashboard/DashboardAdmin.module.css'

import MenuDash from './MenuDash/MenuDash';
import { Outlet } from 'react-router-dom';

const DashboardAdmin = () => {

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
      <div className={styles.menuDash}>
        <MenuDash/>
      </div>
      <section className={styles.containerDashInfo}>
        <Outlet/>
        
          
            {/* <UsersPanel users={users} handleDeleteUsers={handleDeleteUsers}/>
            <PropertiesPanel properties={allProperties} handleDeleteProperty={handleDeleteProperty}/> */}
      </section>
      
    </div>
  );
};

export default DashboardAdmin;
