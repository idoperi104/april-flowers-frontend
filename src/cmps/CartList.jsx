import { memo } from "react"
import { CartPreview } from "./CartPreview"

function _CartList({ cartItems, onUpdateCartItemQuantity, onNavigate }) {
  return (
    <ul className="cart-list">
      {cartItems.map((cartItem) => (
        <CartPreview
          key={cartItem._id}
          cartItem={cartItem}
          onUpdateCartItemQuantity={onUpdateCartItemQuantity}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  )
}

export const CartList = memo(_CartList)
