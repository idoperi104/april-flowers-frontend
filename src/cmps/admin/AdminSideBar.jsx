import {
  faBox,
  faChartPie,
  faListUl,
  faRectangleList,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

export function AdminSideBar() {
  return (
    <nav className="admin-side-bar">
      <NavLink to="/admin/dashboard">
        <FontAwesomeIcon icon={faChartPie} />
        <p>נתונים</p>
      </NavLink>

      <NavLink to="/admin/products">
        <FontAwesomeIcon icon={faBox} />
        <p>מוצרים</p>
      </NavLink>

      <NavLink to="/admin/categories">
        <FontAwesomeIcon icon={faListUl} />
        <p>קטגוריות</p>
      </NavLink>

      <NavLink to="/admin/orders">
        <FontAwesomeIcon icon={faRectangleList} />
        <p>הזמנות</p>
      </NavLink>

      <NavLink to="/admin/admins">
      <FontAwesomeIcon icon={faUserGroup} />
        <p>מנהלים</p>
      </NavLink>

      {/* <NavLink to="/admin/shipping">
      <FontAwesomeIcon icon={faTruck} />
      <p>מחירי משלוח</p>
      </NavLink> */}
    </nav>
  )
}
