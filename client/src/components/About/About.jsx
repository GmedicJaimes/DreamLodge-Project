import styles from "./About.module.css"
import React from 'react';
import { Link } from "react-router-dom"




const About = () => {
    return(
        <footer className={styles.footer}>
        <div className={styles.footerTitle}>
          <span>&copy; 2023 DreamLogde</span>
          </div>
          <div className={styles.footerText}>
          <Link to={'/privacy&termns'}> <span>Privacy</span></Link>
         <Link to={'/privacy&termns'}> <span>Terms</span></Link>
         <Link to={'/privacy&termns'}> <span>Company Data</span></Link>
        </div>
      </footer>
    )
}

export default About