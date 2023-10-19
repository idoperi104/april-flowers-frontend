export const SET_CATEGORIES = "SET_CATEGORIES"
export const ADD_CATEGORY = "ADD_CATEGORY"
export const REMOVE_CATEGORY = "REMOVE_CATEGORY"
export const UPDATE_CATEGORY = "UPDATE_CATEGORY"
export const SET_FILTER_BY = "SET_FILTER_BY"
export const SET_USER_CATEGORIES = "SET_USER_CATEGORIES"
export const REMOVE_USER_CATEGORY = "REMOVE_USER_CATEGORY"

const INITIAL_STATE = {
  categories: null,
  userCategories: null,
  filterBy: {
    name: "",
  },
}

export function categoryReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      }
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.category],
      }
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.categoryId
        ),
      }
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.category._id ? action.category : category
        ),
      }
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...action.filterBy },
      }

    default:
      return state
  }
}
