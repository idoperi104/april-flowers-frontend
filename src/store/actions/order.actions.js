import { orderService } from "../../services/order.service"
import {
  REMOVE_ORDER,
  SET_ORDERS,
  SET_ORDER_FILTER_BY,
  UPDATE_ORDER,
  ADD_ORDER,
} from "../reducers/order.reducer"

export function loadOrders() {
  return async (dispatch, getState) => {
    try {
      const orders = await orderService.query(
        getState().orderModule.orderFilterBy
      )
      const action = {
        type: SET_ORDERS,
        orders,
      }
      dispatch(action)
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function removeOrder(orderId) {
  return async (dispatch) => {
    try {
      await orderService.remove(orderId)
      const action = { type: REMOVE_ORDER, orderId }
      dispatch(action)
      return "Removed!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function saveOrder(order) {
  console.log("order: ", order)
  return async (dispatch) => {
    try {
      const savedOrder = await orderService.save({ ...order })

      var action
      if (order._id)
        action = { type: UPDATE_ORDER, order: savedOrder }
      else action = { type: ADD_ORDER, order: savedOrder }

      console.log("action: ", action)
      dispatch(action)
      return "saved!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function updateOrderKeyVal(order, key, val) {
  return async (dispatch) => {
    try {
      order = await orderService.save({ ...order, [key]: val })
      const action = { type: UPDATE_ORDER, order }
      dispatch(action)
      return "Updated!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

// Filter by:

export function setOrderFilterBy(orderFilterBy) {
  return (dispatch) => {
    dispatch({ type: SET_ORDER_FILTER_BY, orderFilterBy })
  }
}
