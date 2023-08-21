import React, { useEffect, useState } from 'react';
import styles from '../Dashboard/DashboardAdmin.module.css'

import MenuDash from './MenuDash/MenuDash';
import { Outlet } from 'react-router-dom';
import About from '../../components/About/About';

const DashboardAdmin = () => {

  
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.menuDash}>
        <MenuDash/>
      </div>
      <section className={styles.containerDashInfo}>
        <Outlet/>
      </section>
      {/* <About/> */}
    </div>
  );
};

export default DashboardAdmin;
