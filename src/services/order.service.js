import { httpService } from './http.service.js'

const STORAGE_KEY = "order"

export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder,
  getEmptyFilterBy,
}

async function query(filterBy = { name: "", shipped: "", paid: "" }) {
  return httpService.get(STORAGE_KEY, filterBy)
}

function getById(orderId) {
  return httpService.get(`${STORAGE_KEY}/${orderId}`)
}

async function remove(orderId) {
  return httpService.delete(`${STORAGE_KEY}/${orderId}`)
}

async function save(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await httpService.put(`${STORAGE_KEY}/${order._id}`, order)
  } else {
    savedOrder = await httpService.post(STORAGE_KEY, order)
  }
  return savedOrder
}

function getEmptyOrder() {
  return {
    cartItems: [],
    isShipped: false,
    isPaid: false,
    createdAt: null,
    price: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    receiverFirstName: "",
    receiverLastName: "",
    receiverPhoneNumber: "",
    address: "",
    apartment: "",
    city: "",
  }
}

function getEmptyFilterBy() {
  return {
    name: "",
    shipped: "",
    paid: "",
  }
}
