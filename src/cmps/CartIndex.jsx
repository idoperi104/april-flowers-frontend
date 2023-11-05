import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  loadCartItems,
  setIsCartOpen,
  toggleIsOpen,
  updateCartItemQuantity,
} from "../store/actions/cart.actions"
import { CartList } from "../cmps/CartList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

export function CartIndex() {
  const cartItems = useSelector((storeState) => storeState.cartModule.cartItems)
  const isOpen = useSelector((storeState) => storeState.cartModule.isOpen)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadCartItems())
    // eslint-disable-next-line
  }, [])

  function onClose() {
    dispatch(toggleIsOpen())
  }

  function onUpdateCartItemQuantity(cartItem, num) {
    dispatch(updateCartItemQuantity(cartItem, num))
  }

  function getIsOpenClass() {
    return isOpen ? "" : "close"
  }

  function getTotalPrice() {
    const initialVal = 0
    const totalPrice = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      initialVal
    )
    return totalPrice
  }

  function onNavigate() {
    dispatch(setIsCartOpen(false))
  }

  function onCheckoutClicked() {
    dispatch(setIsCartOpen(false))
    navigate("checkout")
  }

  if (!cartItems) return <div>Loading...</div>
  return (
    <section className={`cart-index ${getIsOpenClass()}`}>
      <div onClick={onClose} className="cover"></div>
      <div className="container">
        <div className="top-container flex">
          <h2 className="title">הסל שלך</h2>
          <button className="btn-close" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <CartList
          cartItems={cartItems}
          onUpdateCartItemQuantity={onUpdateCartItemQuantity}
          onNavigate={onNavigate}
        />
        <div className="bottom-container">
          <h2 className="title">מחיר כולל</h2>
          <span className="price">{getTotalPrice()} ₪</span>
          <button className="btn-checkout" onClick={onCheckoutClicked}>
            מעבר לתשלום
          </button>
        </div>
      </div>
    </section>
  )
}
