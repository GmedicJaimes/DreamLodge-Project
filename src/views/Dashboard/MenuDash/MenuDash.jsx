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
          <p>Properties</p>
        </Link>
        <Link to={'/admin/users'}>
          <p>Users</p>
        </Link>
        <Link to={'/admin/reviews'}>
          <p>Reviews</p>
        </Link>
        <Link to={'/admin/failures'}>
          <p>Failures</p>
        </Link>
        {/* <Link to={'/admin/rent-profit'}>
          <p>Rent & Profit</p>
        </Link> */}
      </aside>
    </div>
  )
}

export default MenuDash;