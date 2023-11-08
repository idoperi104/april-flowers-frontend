import "./App.css"
import "./assets/scss/global.scss"
import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { ProductIndex } from "./views/ProductIndex"
import { AppHeader } from "./cmps/AppHeader"
import { AdminPage } from "./views/AdminPage"
import { AdminDashboard } from "./views/admin/AdminDashboard"
import { AdminProductIndex } from "./views/admin/AdminProductIndex"
import { AdminProductEdit } from "./views/admin/AdminProductEdit"
import { AdminCategoryIndex } from "./views/admin/AdminCategoryIndex"
import { AdminCategoryEdit } from "./cmps/admin/AdminCategoryEdit"
import { ProductDetails } from "./views/ProductDetails"
import { CartIndex } from "./cmps/CartIndex"
import { CollectionPage } from "./views/CollectionPage"
import { CategoryPage } from "./views/CategoryPage.jsx"
import { useDispatch } from "react-redux"
import { loadCategories } from "./store/actions/category.actions"
import { useEffect } from "react"
import { HomePage } from "./views/HomePage"
import { AppFooter } from "./cmps/AppFooter"
import { ScrollToTop } from "./cmps/ScrollToTop"
import { LoginSignup } from "./views/LoginSignup"
import { loadLoggedinUser } from "./store/actions/user.actions"
import { AdminUserIndex } from "./views/admin/AdminUserIndex"
import { CheckoutPage } from "./views/CheckoutPage"
import { AdminOrderIndex } from "./views/admin/AdminOrderIndex"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCategories())
    dispatch(loadLoggedinUser())
    window.addEventListener("resize", appHeight)
    appHeight()
    return () => {}
  }, [])

  function appHeight() {
    const doc = document.documentElement
    doc.style.setProperty("--app-height", `${window.innerHeight}px`)
  }

  return (
    <Router>
      <section className="main-app">
        <AppHeader />
        <CartIndex />

        <main className="main-container">
          <ScrollToTop />
          
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<LoginSignup />} />

            <Route path="/product" element={<ProductIndex />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/collection/:name" element={<CategoryPage />} />

            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/admin" element={<AdminPage />}>
              {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
              <Route path="products" element={<AdminProductIndex />} />
              <Route path="products/edit/:id?" element={<AdminProductEdit />} />
              <Route path="categories" element={<AdminCategoryIndex />}>
                <Route path="edit/:id?" element={<AdminCategoryEdit />} />
              </Route>
              <Route path="orders" element={<AdminOrderIndex />} />
              <Route path="users" element={<AdminUserIndex />} />
            </Route>
          </Routes>
        </main>

        <AppFooter />
      </section>
    </Router>
  )
}

export default App
