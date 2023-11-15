import { storageService } from "./local-storage.service.js"

const STORAGE_KEY = "cartItems"

export const cartService = {
  query,
  getById,
  save,
  remove,
  addCartItem,
  getPriceCartItems,
  reset,
  //   getEmptyProduct,
  //   getEmptyFilterBy,
}

function query() {
  var cartItems = storageService.query(STORAGE_KEY)

  if (!cartItems) {
    cartItems = []
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
  }

  return cartItems
}

function reset() {
  const emptyList = []
  storageService.reset(STORAGE_KEY)
  return emptyList
}

function getById(cartItemId) {
  return storageService.get(STORAGE_KEY, cartItemId)
}

function remove(cartItemId) {
  storageService.remove(STORAGE_KEY, cartItemId)
}

function save(cartItem) {
  var savedCartItem
  if (cartItem._id) {
    savedCartItem = storageService.put(STORAGE_KEY, cartItem)
  } else {
    savedCartItem = storageService.post(STORAGE_KEY, cartItem)
  }
  return savedCartItem
}

function getByProductId(productId) {
  const cartItems = query()
  const cartItem = cartItems.find(
    (cartItem) => cartItem.productId === productId
  )
  return cartItem
}

function addCartItem(item) {
  var cartItem = getByProductId(item.productId)

  if (!cartItem) {
    cartItem = { ...item, quantity: 0 }
  }

  cartItem.quantity++

  return save(cartItem)
}

function getPriceCartItems() {
  const cartItems = query()

  const initialVal = 0
  const sum = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    initialVal
  )

  console.log(sum)
}

// function getEmptyProduct() {
//   return {
//     name: "",
//     desc: "",
//     imgUrls: [],
//     category: "",
//     isSeveralSizes: false,
//     price: 0,
//     prices: [],
//     isInStock: true,
//   }
// }

// function getEmptyFilterBy() {
//   return {
//     name: "",
//   }
// }
