import { categoryService } from "../../services/category.service.local"
import {
  REMOVE_CATEGORY,
  SET_CATEGORIES,
  SET_FILTER_BY,
  UPDATE_CATEGORY,
} from "../reducers/category.reducer"

export function loadCategories() {
  return async (dispatch, getState) => {
    try {
      const categories = await categoryService.query()
      const action = {
        type: SET_CATEGORIES,
        categories,
      }
      dispatch(action)
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function removeCategory(categoryId) {
  return async (dispatch) => {
    try {
      await categoryService.remove(categoryId)
      const action = { type: REMOVE_CATEGORY, categoryId }
      dispatch(action)
      return "Removed!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function updateCategoryKeyVal(category, key, val) {
  return async (dispatch) => {
    try {
      category = await categoryService.save({ ...category, [key]: val })
      const action = { type: UPDATE_CATEGORY, category }
      dispatch(action)
      return "Updated!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

// Filter by:

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }
}
