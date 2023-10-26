export const SET_CART_ITEMS = "SET_CART_ITEMS"
export const ADD_CART_ITEM = "ADD_CART_ITEM"
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM"
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM"
export const SET_IS_CART_OPEN = "SET_IS_CART_OPEN"

const INITIAL_STATE = {
  cartItems: [],
  isOpen: false,
}

export function cartReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      }
    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.cartItem],
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== action.cartItemId
        ),
      }
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem._id === action.cartItem._id ? action.cartItem : cartItem
        ),
      }
    case SET_IS_CART_OPEN:
      return {
        ...state,
        isOpen: action.isOpen,
      }

    default:
      return state
  }
}
