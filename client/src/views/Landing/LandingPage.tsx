import { Link } from 'react-router-dom';

import style from './Landing.module.css'

const Landing = (): JSX.Element  => {

  return (
    <div>
      <h1 className={style.h1}>Estamos en la Landing</h1>
      <Link to={'/home'}>
        <button>Enter</button>
      </Link>
    </div>
  )
}

export default Landing;