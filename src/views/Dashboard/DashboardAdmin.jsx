import React, { useEffect, useState } from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../config/firebase';

const DashboardAdmin = ({totalImages, totalProperties, totalUsers}) => {
    const [purchaseSize, setPurchaseSize] = useState(0)
  useEffect(()=>{
    const getPurchaseCount = async()=>{
      try {
        const purchasesSnapshot = await getDocs(collection(db, 'purchases' ));
        const totalPurchases = purchasesSnapshot.size;
        setPurchaseSize(totalPurchases)
      } catch (error) {
        console.error(error)
      }
    }
    getPurchaseCount()
  }, []);

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Total de Propiedades</h2>
        <p>{totalProperties ? totalProperties : "No hay propiedades en la base de datos"}</p>
      </div>
      <div className="card">
        <h2>Usuarios Registrados</h2>
        <p>{totalUsers ? totalUsers : "No hay usuarios en al base de datos"}</p>
      </div>
      <div className="card">
        <h2>Imagenes cargadas</h2>
        <p>{totalImages ? totalImages : "No hay imagenes en la base de datos"}</p>
      </div>
      <div className="card">
        <h2>Propiedades Rentadas</h2>
        <p>{purchaseSize ? purchaseSize : "No se han rentado propiedades aun"}</p>
      </div>
    </div>
  );
}

export default DashboardAdmin;