import { Link } from "react-router-dom"
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
          <span><a href="">Privacidad</a></span>
          <span><a href="">Terminos</a></span>
          <span><a href="">Mapa de sitio</a></span>
          <span><a href="">Datos de la empresa</a></span>
        </div>
      </footer>

    </div>
  )
}

export default Landing;