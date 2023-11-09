import { storageService } from "./async-storage.service.js"
import data from "../assets/json/order.json"

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
  var orders = await storageService.query(STORAGE_KEY)
  if (!orders || orders.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    orders = data
  }

  if (filterBy.name) {
    const regex = new RegExp(filterBy.name, "i")
    orders = orders.filter((order) =>
      regex.test(`${order.firstName} ${order.lastName}`)
    )
  }

  if (filterBy.shipped) {
    switch (filterBy.shipped) {
      case "shipped":
        orders = orders.filter((order) => order.isShipped === true)
        break
      case "notShipped":
        orders = orders.filter((order) => order.isShipped === false)
        break
      default:
        break
    }
  }

  if (filterBy.paid) {
    switch (filterBy.paid) {
      case "paid":
        orders = orders.filter((order) => order.isPaid === true)
        break
      case "notPaid":
        orders = orders.filter((order) => order.isPaid === false)
        break
      default:
        break
    }
  }

  orders = orders.sort((a, b) => b.createdAt - a.createdAt)

  return orders
}

function getById(orderId) {
  return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
  await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await storageService.put(STORAGE_KEY, order)
  } else {
    savedOrder = await storageService.post(STORAGE_KEY, order)
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
