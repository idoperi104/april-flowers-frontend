import { storageService } from "./async-storage.service.js"
import data from "../assets/json/category.json"

const STORAGE_KEY = "category"

export const categoryService = {
  query,
  getById,
  save,
  remove,
  getEmptyCategory,
  getEmptyFilterBy,
}
window.rs = categoryService

async function query(filterBy = { name: "" }) {
  var categories = await storageService.query(STORAGE_KEY)
  if (!categories || categories.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    categories = data
  }
  // if (filterBy.title) {
  //   const regex = new RegExp(filterBy.title, "i")
  //   categories = categories.filter((category) => regex.test(category.title))
  // }

  return categories
}

function getById(categoryId) {
  return storageService.get(STORAGE_KEY, categoryId)
}

async function remove(categoryId) {
  await storageService.remove(STORAGE_KEY, categoryId)
}

async function save(category) {
  var savedCategory
  if (category._id) {
    savedCategory = await storageService.put(STORAGE_KEY, category)
  } else {
    savedCategory = await storageService.post(STORAGE_KEY, category)
  }
  return savedCategory
}

function getEmptyCategory() {
  return {
    name: "",
    subCategories: [],
  }
}

function getEmptyFilterBy() {
  return {
    name: "",
  }
}
