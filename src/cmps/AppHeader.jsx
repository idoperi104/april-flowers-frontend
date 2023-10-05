import { NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"

export function AppHeader() {
  const navigate = useNavigate()

  function onLogoClicked() {
    navigate("/")
  }

  return (
    <header className="app-header">
      <section className="actions-container">
        <button className="btn-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <NavLink to="/cart" className="btn-cart">
          <FontAwesomeIcon icon={faCartShopping} />
        </NavLink>
      </section>

      <nav className="nav-container">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/admin">AdminPage</NavLink>
      </nav>

      <h1 onClick={onLogoClicked} className="logo">
        פרחי אפריל
      </h1>
    </header>
  )
}
