import {
  SET_CART_ITEMS,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM,
  SET_IS_CART_OPEN,
} from "../reducers/cart.reducer"

import { cartService } from "../../services/cart.service"

export function loadCartItems() {
  return async (dispatch) => {
    try {
      const cartItems = cartService.query()
      const action = {
        type: SET_CART_ITEMS,
        cartItems,
      }
      dispatch(action)
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function resetCartItems() {
  return async (dispatch) => {
    try {
      const cartItems = cartService.reset()
      const action = {
        type: SET_CART_ITEMS,
        cartItems,
      }
      dispatch(action)
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function removeCartItem(cartItemId) {
  return async (dispatch) => {
    try {
      cartService.remove(cartItemId)
      const action = { type: REMOVE_CART_ITEM, cartItemId }
      dispatch(action)
      return "Removed!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function updateCartItem(cartItem) {
  return async (dispatch) => {
    try {
      cartService.save(cartItem)
      const action = { type: UPDATE_CART_ITEM, cartItem }
      dispatch(action)
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function addCartItem(product) {
  return async (dispatch, getState) => {
    try {
      var item = {
        productId: product._id,
        name: product.name,
        price: product.price,
        imgUrl: product.imgUrl,
      }

      const cartItem = cartService.addCartItem(item)

      if (
        getState().cartModule.cartItems.find(
          (item) => item._id === cartItem._id
        )
      ) {
        const action = { type: UPDATE_CART_ITEM, cartItem }
        dispatch(action)
      } else {
        const action = { type: ADD_CART_ITEM, cartItem }
        dispatch(action)
      }

      return "Added!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function updateCartItemQuantity(cartItem, num) {
  return async (dispatch, getState) => {
    try {
      cartItem.quantity += num

      if (cartItem.quantity === 0) dispatch(removeCartItem(cartItem._id))
      else dispatch(updateCartItem(cartItem))

      return "quantity updated!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function toggleIsOpen() {
  return async (dispatch, getState) => {
    try {
      const isOpen = !getState().cartModule.isOpen
      const action = { type: SET_IS_CART_OPEN, isOpen }
      dispatch(action)
      return "Toggled!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function setIsCartOpen(isOpen) {
  return async (dispatch) => {
    try {
      const action = { type: SET_IS_CART_OPEN, isOpen }
      dispatch(action)
      return "Toggled!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}
