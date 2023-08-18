import style from './MenuDash.module.css'
import { Link } from 'react-router-dom';

const MenuDash = () => {
  return (
    <div className={style.dashboardMenu}>
      <aside className={style.asideDash}>
        <h3>Admin Panel</h3>
        <Link to={'/admin/'}>
          <p>Dashboard</p>
        </Link>
        <Link to={'/admin/propertys'}>
          <p>Propertys</p>
        </Link>
        <Link to={'/admin/users'}>
          <p>Users</p>
        </Link>
        <Link to={'/admin/images'}>
          <p>Images</p>
        </Link>
        <Link to={'/admin/rent-profit'}>
          <p>Rent & Profit</p>
        </Link>
      </aside>
    </div>
  )
}

export default MenuDash;