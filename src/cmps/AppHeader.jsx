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
  const cartItems = useSelector((storeState) => storeState.cartModule.cartItems)

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  function getNumOfItems(){
    const initialValue = 0
    return cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, initialValue)
  }

  return (
    <header className="app-header">
      <section className="actions-container">
        <button className="btn-menu" onClick={onToggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button onClick={onToggleCart} className="btn-cart">
          <FontAwesomeIcon icon={faCartShopping} />
          {getNumOfItems() ? (
            <div className="num-of-items">
              <span>{getNumOfItems()}</span>
            </div>
          ) : null}
        </button>
        {loggedinUser?.isAdmin ? (
          <NavLink onClick={onNavigate} to="/admin/orders">
            <button className="btn-user">
              <FontAwesomeIcon icon={faShop} />
            </button>
          </NavLink>
        ) : null}
      </section>

      <nav className={`nav-container ${getIsOpenClass()}`}>
        {loggedinUser?.isAdmin ? (
          <NavLink onClick={onNavigate} to="/admin/orders">
            עמוד מנהל
          </NavLink>
        ) : null}
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
