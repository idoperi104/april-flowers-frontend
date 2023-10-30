import {
  SET_IS_MENU_OPEN,
} from "../reducers/app.reducer"

export function toggleIsMenuOpen() {
  return async (dispatch, getState) => {
    try {
      const isMenuOpen = !getState().appModule.isMenuOpen
      const action = { type: SET_IS_MENU_OPEN, isMenuOpen }
      dispatch(action)
      return "Toggled!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}

export function setIsMenuOpen(isMenuOpen) {
  return async (dispatch) => {
    try {
      const action = { type: SET_IS_MENU_OPEN, isMenuOpen }
      dispatch(action)
      return "Toggled!"
    } catch (error) {
      console.log("error:", error)
    }
  }
}
