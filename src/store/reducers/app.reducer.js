export const SET_IS_MENU_OPEN = "SET_IS_MENU_OPEN"

const INITIAL_STATE = {
  isMenuOpen: false,
}

export function AppReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_IS_MENU_OPEN:
      return {
        ...state,
        isMenuOpen: action.isMenuOpen,
      }

    default:
      return state
  }
}
