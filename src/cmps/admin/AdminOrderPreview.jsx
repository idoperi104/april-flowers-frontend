import {
  faPenToSquare,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { NavLink } from "react-router-dom"
// import { Link } from "react-router-dom"

export function AdminOrderPreview({
  order,
  onRemoveOrder,
  onUpdateOrderKeyVal,
}) {
  function getIsPaidClass() {
    return order.isPaid ? "green" : "red"
  }
  function getIsShippedClass() {
    return order.isShipped ? "green" : "red"
  }

  const { cartItems } = order
  return (
    <li className="admin-order-preview">
      <ul className="order-info">
        <h3 className="title">פרטי ההזמנה</h3>
        {cartItems.map((cartItem) => (
          <li key={cartItem._id} className="flex align-center flex gap-6">
            <p>{cartItem.quantity}</p>
            <FontAwesomeIcon icon={faXmark} />
            <NavLink to={`/product/${cartItem.productId}`}>
              {cartItem.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="receiver-info">
        <h3 className="title">פרטי המקבל</h3>
        <p>
          שם: {order.receiverFirstName} {order.receiverLastName}
        </p>
        <p>טלפון: {order.receiverPhoneNumber}</p>
        <p>כתובת: {order.address}</p>
        <p>דירה: {order.apartment}</p>
        <p>עיר: {order.city}</p>
      </div>

      <div className="user-info">
        <h3 className="title">פרטי המזמין</h3>
        <p>
          שם: {order.firstName} {order.lastName}
        </p>
        <p>טלפון: {order.phoneNumber}</p>
      </div>

      <button
        className={`btn-toggle ${getIsPaidClass()}`}
        onClick={() => onUpdateOrderKeyVal(order, "isPaid", !order.isPaid)}
      >
        {order.isPaid ? "שולם" : "לא שולם"}
      </button>

      <button
        className={`btn-toggle ${getIsShippedClass()}`}
        onClick={() =>
          onUpdateOrderKeyVal(order, "isShipped", !order.isShipped)
        }
      >
        {order.isShipped ? "נשלח" : "לא נשלח"}
      </button>

      <div className="more-info grid">
        <h3 className="title">מידע נוסף</h3>
        <p>מחיר ההזמנה: {order.price} ₪</p>
        <p>תאריך ההזמנה: {new Date(order.createdAt).toLocaleString("en-GB")}</p>
        <button className="btn" onClick={() => onRemoveOrder(order._id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </li>
  )
}
