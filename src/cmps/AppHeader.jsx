import { NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { setIsCartOpen, toggleIsOpen } from "../store/actions/cart.actions"

export function AppHeader() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const numOfItems = useSelector(
    (storeState) => storeState.cartModule.cartItems.length
  )

  function onLogoClicked() {
    dispatch(setIsCartOpen(false))
    navigate("/")
  }

  function onToggleCart() {
    dispatch(toggleIsOpen())
  }

  function onNavigate(){
    dispatch(setIsCartOpen(false))
  }

  return (
    <header className="app-header">
      <section className="actions-container">
        <button className="btn-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <button onClick={onToggleCart} className="btn-cart">
          <FontAwesomeIcon icon={faCartShopping} />
          {numOfItems ? (
            <div className="num-of-items">
              <span>{numOfItems}</span>
            </div>
          ) : null}
        </button>
        {/* <NavLink to="/cart" className="btn-cart">
          <FontAwesomeIcon icon={faCartShopping} />
        </NavLink> */}
        <NavLink onClick={onNavigate} to="/admin/products">עמוד מנהל</NavLink>
      </section>

      <nav className="nav-container">
        {/* <NavLink to="/">Home</NavLink> */}
        <NavLink onClick={onNavigate} to="/collection">לכל הקטגוריות</NavLink>
        {/* <NavLink onClick={onNavigate} to="/product">לכל המוצרים</NavLink> */}
        <NavLink onClick={onNavigate} to="/collection/זרי פרחים">זרי פרחים</NavLink>
        <NavLink onClick={onNavigate} to="/collection/מארזי פרחים">מארזי פרחים</NavLink>
        {/* <NavLink onClick={onNavigate} to="/product">מארזי פרחים</NavLink> */}
      </nav>

      <h1 onClick={onLogoClicked} className="logo">
        פרחי אפריל
      </h1>
    </header>
  )
}
