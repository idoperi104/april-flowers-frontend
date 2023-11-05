import thunk from "redux-thunk"
import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux"
import { productReducer } from "./reducers/product.reducer"
import { categoryReducer } from "./reducers/category.reducer"
import { cartReducer } from "./reducers/cart.reducer"
import { AppReducer } from "./reducers/app.reducer"
import { userReducer } from './reducers/user.reducer'
import { orderReducer } from './reducers/order.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  productModule: productReducer,
  categoryModule: categoryReducer,
  cartModule: cartReducer,
  appModule: AppReducer,
  userModule: userReducer,
  orderModule: orderReducer,
})

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

window.gStore = store
