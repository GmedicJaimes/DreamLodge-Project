import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';

import styles from './Dashboard.module.css'

const Dashboard = ({ totalImages, totalProperties, totalUsers }) => {

  const [purchaseSize, setPurchaseSize] = useState(0);
  const [totalGanancias, setTotalGanancias] = useState(0);
  const [netEarnings, setNetEarnings] = useState(0)
  useEffect(() => {
    const getPurchaseCount = async () => {
      try {
        const purchasesSnapshot = await getDocs(collection(db, 'purchases'));
        const totalPurchases = purchasesSnapshot.size;
        setPurchaseSize(totalPurchases);
        const purchases = purchasesSnapshot.docs.map(doc=>({ id: doc.id, ...doc.data() }));
        const sumTotalTickets = (purchases) => {
          let total = 0;
          for (let i = 0; i < purchases.length; i++) {
            const purchase = purchases[i];
            const totalTicket = parseFloat(purchase.totalTicket);
            if (!isNaN(totalTicket)) {
              total += totalTicket;
            }
          }
          return total;
        };
        const totalGanancias = sumTotalTickets(purchases);
        setTotalGanancias(totalGanancias);
        const calculateNetEarnings = (totalGanancias) => {
          const netEarnings = totalGanancias * 0.05;
          return netEarnings;
        };
        const netEarnings = calculateNetEarnings(totalGanancias);
        setNetEarnings(netEarnings)
      } catch (error) {
        console.error(error);
      }
    };
    getPurchaseCount();

  }, []);

  return(
    <div className={styles.dashContainer}>
      <div className={styles.title}>
        <h2>Dashboard:</h2>
      </div>
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
            <p>{totalGanancias ? `$${totalGanancias}` : "$0"}</p>
          </div>
          <div className={styles.dashboardSection}>
            <h2>Ganancias netas:</h2>
            <p>{netEarnings ? `$${netEarnings}` : "$0"}</p>
          </div>
      </div>
    </div>
  )
}

export default Dashboard;