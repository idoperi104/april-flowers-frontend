import { httpService } from "./http.service.js"

const STORAGE_KEY = "product"

export const productService = {
  query,
  getById,
  save,
  remove,
  getEmptyProduct,
  getEmptyFilterBy,
}

async function query(
  filterBy = { name: "", category: "", stock: "", sortBy: "", amount: 0 }
) {
  return httpService.get(STORAGE_KEY, filterBy)
}

function getById(productId) {
  return httpService.get(`${STORAGE_KEY}/${productId}`)
}

async function remove(productId) {
  return httpService.delete(`${STORAGE_KEY}/${productId}`)
}

async function save(product) {
  var savedProduct
  if (product._id) {
    savedProduct = await httpService.put(`${STORAGE_KEY}/${product._id}`, product)

  } else {
    savedProduct = await httpService.post(STORAGE_KEY, product)
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
