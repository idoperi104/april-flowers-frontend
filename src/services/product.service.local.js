import { storageService } from "./async-storage.service.js"
import data from "../assets/json/product.json"

const STORAGE_KEY = "product"

export const productService = {
  query,
  getById,
  save,
  remove,
  getEmptyProduct,
  getEmptyFilterBy,
}
window.rs = productService

async function query(
  filterBy = { name: "", category: "", stock: "", sortBy: "", amount: 0 }
) {
  var products = await storageService.query(STORAGE_KEY)
  if (!products || products.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    products = data
  }

  if (filterBy.name) {
    const regex = new RegExp(filterBy.name, "i")
    products = products.filter((product) => regex.test(product.name))
  }

  if (filterBy.category) {
    products = products.filter(
      (product) => product.category === filterBy.category
    )
  }

  if (filterBy.stock) {
    switch (filterBy.stock) {
      case "inStock":
        products = products.filter((product) => product.isInStock === true)
        break
      case "outOfStock":
        products = products.filter((product) => product.isInStock === false)
        break
      default:
        break
    }
  }

  if (filterBy.sort) {
    switch (filterBy.sort) {
      case "salesAmount":
        products = products.sort((a, b) => {
          const num1 = a.salesAmount
          const num2 = b.salesAmount
          if (num1 < num2) return 1
          if (num1 > num2) return -1
          return 0
        })
        break
      default:
        break
    }
  } else {
    products = products.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if (nameA < nameB) return 1
      if (nameA > nameB) return -1
      return 0
    })
  }

  if (filterBy.amount) {
    if (products.length > filterBy.amount) {
      products = products.slice(0, filterBy.amount)
    }
  }

  return products
}

function getById(productId) {
  return storageService.get(STORAGE_KEY, productId)
}

async function remove(productId) {
  await storageService.remove(STORAGE_KEY, productId)
}

async function save(product) {
  var savedProduct
  if (product._id) {
    savedProduct = await storageService.put(STORAGE_KEY, product)
  } else {
    savedProduct = await storageService.post(STORAGE_KEY, product)
  }
  return savedProduct
}

function getEmptyProduct() {
  return {
    name: "",
    desc: "",
    imgUrl: "",
    category: "",
    price: 0,
    isInStock: true,
    salesAmount: 0,
  }
}

function getEmptyFilterBy() {
  return {
    name: "",
    category: "",
    stock: "",
    sortBy: "",
    amount: 0,
  }
}
