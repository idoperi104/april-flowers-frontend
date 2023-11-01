import { NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faCartShopping,
  faShop,
} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { setIsCartOpen, toggleIsOpen } from "../store/actions/cart.actions"
import { setIsMenuOpen, toggleIsMenuOpen } from "../store/actions/app.actions"

export function AppHeader() {
  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const numOfItems = useSelector(
    (storeState) => storeState.cartModule.cartItems.length
  )

  const isMenuOpen = useSelector(
    (storeState) => storeState.appModule.isMenuOpen
  )

  const isCartOpen = useSelector(
    (storeState) => storeState.cartModule.isCartOpen
  )

  function getIsOpenClass() {
    return isMenuOpen ? "" : "close"
  }

  function onLogoClicked() {
    if (isMenuOpen) dispatch(setIsMenuOpen(false))
    if (isCartOpen) dispatch(setIsCartOpen(false))
    window.scrollTo(0, 0)
    navigate("/")
  }

  function onToggleCart() {
    dispatch(setIsMenuOpen(false))
    dispatch(toggleIsOpen())
  }

  function onToggleMenu() {
    dispatch(setIsCartOpen(false))
    dispatch(toggleIsMenuOpen())
  }

  function onNavigate() {
    if (isCartOpen) dispatch(setIsCartOpen(false))
    if (isMenuOpen) dispatch(setIsMenuOpen(false))
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
        {loggedinUser?.isAdmin ? (
          <NavLink onClick={onNavigate} to="/admin/dashboard">
            <button className="btn-user">
              <FontAwesomeIcon icon={faShop} />
            </button>
          </NavLink>
        ) : null}
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
