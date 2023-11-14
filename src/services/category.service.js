import { httpService } from './http.service.js'

const STORAGE_KEY = "category"

export const categoryService = {
  query,
  getById,
  save,
  remove,
  getEmptyCategory,
  getEmptyFilterBy,
}

async function query(filterBy = { name: "" }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(categoryId) {
  return httpService.get(`${STORAGE_KEY}/${categoryId}`)
}

async function remove(categoryId) {
  return httpService.delete(`${STORAGE_KEY}/${categoryId}`)
}

async function save(category) {
  var savedCategory
  if (category._id) {
    savedCategory = await httpService.put(`${STORAGE_KEY}/${category._id}`, category)
  } else {
    savedCategory = await httpService.post(STORAGE_KEY, category)
  }
  return savedCategory
}

function getEmptyCategory() {
  return {
    name: "",
    imgUrl: "",
    themeImgUrl: "",
  }
}

function getEmptyFilterBy() {
  return {
    name: "",
  }
}
