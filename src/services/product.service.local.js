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

async function query(filterBy = { name: "" }) {

  var products = await storageService.query(STORAGE_KEY)
  if (!products || products.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    products = data
  }
  // if (filterBy.title) {
  //   const regex = new RegExp(filterBy.title, "i")
  //   products = products.filter((product) => regex.test(product.title))
  // }

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
    imgUrls: [],
    category: "",
    isSeveralSizes: false,
    price: 0,
    prices: [],
    isInStock: true
  }
}

function getEmptyFilterBy() {
  return {
    name: "",
  }
}
