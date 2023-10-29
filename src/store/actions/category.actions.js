import { categoryService } from "../../services/category.service.local"
import {
  REMOVE_CATEGORY,
  SET_CATEGORIES,
  SET_CATEGORY_FILTER_BY,
  UPDATE_CATEGORY,
  ADD_CATEGORY,
} from "../reducers/category.reducer"

export function loadCategories() {
  return async (dispatch, getState) => {
    try {
      const categories = await categoryService.query(
        getState().categoryModule.categoryFilterBy
      )
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

export function saveCategory(category) {
  console.log("category: ", category)
  return async (dispatch) => {
    try {
      const savedCategory = await categoryService.save({ ...category })

      var action
      if (category._id)
        action = { type: UPDATE_CATEGORY, category: savedCategory }
      else action = { type: ADD_CATEGORY, category: savedCategory }

      console.log("action: ", action)
      dispatch(action)
      return "saved!"
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

export function setCategoryFilterBy(categoryFilterBy) {
  return (dispatch) => {
    dispatch({ type: SET_CATEGORY_FILTER_BY, categoryFilterBy })
  }
}
