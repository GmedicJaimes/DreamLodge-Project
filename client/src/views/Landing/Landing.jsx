import { Link } from "react-router-dom"

import style from './Landing.module.css'

const Landing = () => {
  return(
    <div className={style.container}>
      <header className={style.header}>
        <h1>DreamLodge</h1>
        <Link to={"/home"}><button>Login</button></Link>
      </header>

      <section className={style.section}>
        <h1>WELCOME HOME</h1>
        <p>Explore the beauty of the world and rest at DreamLodge: <br /> the destination of adventures and dreamers</p>

        <Link to={"/home"}><button>Enter</button></Link>
      </section>

      <footer className={style.footer}>
        <row>
          <li>&copy; 2023 DreamLogde</li>
          <li><a href="">Privacidad</a></li>
          <li><a href="">Terminos</a></li>
          <li><a href="">Mapa de sitio</a></li>
          <li><a href="">Datos de la empresa</a></li>
        </row>
      </footer>

    </div>
  )
}

export default Landing;