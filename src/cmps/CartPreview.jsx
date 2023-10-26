import { faCartPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export function CartPreview({ cartItem, onUpdateCartItemQuantity, onNavigate }) {
  return (
    <li className="cart-preview">
      <img className="img" src={cartItem.imgUrl} alt="" />
      <Link className="name" onClick={onNavigate} to={`product/${cartItem.productId}`}>
        {cartItem.name}
      </Link>
      <div className="actions">
        <div className="quantity-container">
          <button
            className="btn-quantity"
            onClick={() => onUpdateCartItemQuantity(cartItem, 1)}
          >
            +
          </button>
          <span className="quantity">{cartItem.quantity}</span>
          <button
            className="btn-quantity"
            onClick={() => onUpdateCartItemQuantity(cartItem, -1)}
          >
            -
          </button>
        </div>
        <span className="price">{cartItem.price} ₪</span>
      </div>
    </li>
  )
}
