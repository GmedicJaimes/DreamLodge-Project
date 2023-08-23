import { Link } from "react-router-dom"
import React from 'react';
import About from "../../components/About/About.jsx"
import Asset1 from "../../assets/Asset1.png"

import style from './Landing.module.css'

const Landing = () => {
  return(
    <div className={style.container}>
      <div></div>
      <div className={style.headerLanding}>
      <img src={Asset1} alt="" srcset="" className={style.imgLogo}/>
      </div>

      <section className={style.sectionLanding}>
        <h1>Welcome home</h1>
        <p>Explore the beauty of the world and <br />rest at DreamLodge: the destination  <br />of adventures and dreamers</p>

        <Link to={"/home"}><button>Explore</button></Link>
      </section>

      <About/>

      

    </div>
  )
}

export default Landing;




































/* import { Link } from "react-router-dom"
import React from 'react';

import style from './Landing.module.css'

const Landing = () => {
  return(
    <div className={style.container}>
      <header className={style.header}>
        <h1>DreamLodge</h1>
        <Link to={"/login"}><button>Login</button></Link>
      </header>

      <section className={style.section}>
        <h1>Welcome home</h1>
        <p>Explore the beauty of the world and <br />rest at DreamLodge: the destination  <br />of adventures and dreamers</p>

        <Link to={"/home"}><button>Explore</button></Link>
      </section>

      <footer className={style.footer}>
        <div className={style.footerTitle}>
          <span>&copy; 2023 DreamLogde</span>
          </div>
          <div className={style.footerText}>
          <Link to={'/privacy&termns'}> <span>Privacy</span></Link>
         <Link to={'/privacy&termns'}> <span>Terms</span></Link>
         <Link to={'/privacy&termns'}> <span>Company Data</span></Link>
        </div>
      </footer>

    </div>
  )
}

export default Landing;
 */

