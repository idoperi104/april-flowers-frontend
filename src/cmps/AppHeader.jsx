import { NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { setIsCartOpen, toggleIsOpen } from "../store/actions/cart.actions"
import { setIsMenuOpen, toggleIsMenuOpen } from "../store/actions/app.actions"

export function AppHeader() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const numOfItems = useSelector(
    (storeState) => storeState.cartModule.cartItems.length
  )

  const isMenuOpen = useSelector(
    (storeState) => storeState.appModule.isMenuOpen
  )

  function getIsOpenClass() {
    return isMenuOpen ? "" : "close"
  }

  function onLogoClicked() {
    dispatch(setIsCartOpen(false))
    dispatch(setIsMenuOpen(false))
    navigate("/")
  }

  function onToggleCart() {
    dispatch(toggleIsOpen())
    dispatch(setIsMenuOpen(false))
  }

  function onToggleMenu() {
    dispatch(toggleIsMenuOpen())
    dispatch(setIsCartOpen(false))
  }

  function onNavigate() {
    dispatch(setIsCartOpen(false))
    dispatch(setIsMenuOpen(false))
  }

  return (
    <header className="app-header">
      <section className="actions-container">
        <button className="btn-menu" onClick={onToggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button onClick={onToggleCart} className="btn-cart">
          <FontAwesomeIcon icon={faCartShopping} />
          {numOfItems ? (
            <div className="num-of-items">
              <span>{numOfItems}</span>
            </div>
          ) : null}
        </button>
        {/* <button className="btn-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button> */}
        <NavLink onClick={onNavigate} to="/admin/products">
          <button className="btn-user">
            <FontAwesomeIcon icon={faUser} />
          </button>
        </NavLink>
      </section>

      <nav className={`nav-container ${getIsOpenClass()}`}>
        <NavLink onClick={onNavigate} to="/collection">
          לכל הקטגוריות
        </NavLink>
        <NavLink onClick={onNavigate} to="/collection/זרי פרחים">
          זרי פרחים
        </NavLink>
        <NavLink onClick={onNavigate} to="/collection/מארזי פרחים">
          מארזי פרחים
        </NavLink>
      </nav>

      <h1 onClick={onLogoClicked} className="logo">
        פרחי אפריל
      </h1>
    </header>
  )
}
