import { useDispatch, useSelector } from "react-redux"
import { useFormRegister } from "../customHooks/useFormRegister"
import { orderService } from "../services/order.service"
import { useEffect } from "react"
import {
  resetCartItems,
  setIsCartOpen,
  updateCartItemQuantity,
} from "../store/actions/cart.actions"
import { CartList } from "../cmps/CartList"
import { useNavigate } from "react-router-dom"

export function CheckoutPage() {
  const [register, order, handleChange, setOrder] = useFormRegister({
    ...orderService.getEmptyOrder(),
  })

  const cartItems = useSelector((storeState) => storeState.cartModule.cartItems)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      cartItems,
      price: getTotalPrice(),
    }))
  }, [cartItems])

  function getTotalPrice() {
    const initialVal = 0
    const totalPrice = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      initialVal
    )
    return totalPrice
  }

  async function onSaveOrder(ev) {
    ev.preventDefault()
    dispatch(resetCartItems())
    try {
      await orderService.save({ ...order, isPaid: true, createdAt: Date.now() })
      navigate("/")
    } catch (error) {
      console.log("error:", error)
    }
  }

  function onUpdateCartItemQuantity(cartItem, num) {
    dispatch(updateCartItemQuantity(cartItem, num))
  }

  function onNavigate() {
    dispatch(setIsCartOpen(false))
  }

  return (
    <section className="checkout-page">
      <div className="order-preview">
        <CartList
          cartItems={cartItems}
          onUpdateCartItemQuantity={onUpdateCartItemQuantity}
          onNavigate={onNavigate}
        />
        <div className="info-container">
          <p>מחיר כולל:</p>
          <p>{getTotalPrice()} ₪</p>
        </div>
      </div>

      <form className="basic-form" onSubmit={onSaveOrder}>
        <label htmlFor="firstName">שם השולח:</label>
        <input {...register("firstName", "text")} />
        <label htmlFor="lastName">שם משפחת השולח:</label>
        <input {...register("lastName", "text")} />
        <label htmlFor="phoneNumber">טלפון השולח:</label>
        <input {...register("phoneNumber", "text")} />
        <label htmlFor="receiverFirstName">שם המקבל:</label>
        <input {...register("receiverFirstName", "text")} />
        <label htmlFor="receiverLastName">שם משפחת המקבל:</label>
        <input {...register("receiverLastName", "text")} />
        <label htmlFor="receiverPhoneNumber">טלפון המקבל:</label>
        <input {...register("receiverPhoneNumber", "text")} />
        <label htmlFor="address">כתובת:</label>
        <input {...register("address", "text")} />
        <label htmlFor="apartment">מספר דירה:</label>
        <input {...register("apartment", "text")} />
        <label htmlFor="city">עיר:</label>
        <input {...register("city", "text")} />

        <button className="btn-submit">הזמן</button>
      </form>
    </section>
  )
}
