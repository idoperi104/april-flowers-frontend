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
import { loadProducts } from "./store/actions/product.actions"
import { HomePage } from "./views/HomePage"
import { AppFooter } from "./cmps/AppFooter"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCategories())
    // dispatch(loadProducts())
    return () => {
    }
    // eslint-disable-next-line
  }, [])
  

  return (
    <Router>
      <section className="main-app main-layout">
        <AppHeader />
        <CartIndex />

        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/product" element={<ProductIndex />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/collection/:name" element={<CategoryPage />} />

            <Route path="/admin" element={<AdminPage />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductIndex />} />
              <Route path="products/edit/:id?" element={<AdminProductEdit />} />
              <Route path="categories" element={<AdminCategoryIndex />}>
                <Route path="edit/:id?" element={<AdminCategoryEdit />} />
              </Route>
              <Route path="orders" element={<AdminDashboard />} />
              <Route path="admins" element={<AdminDashboard />} />
              <Route path="shipping" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>

        <AppFooter/>

      </section>
    </Router>
  )
}

export default App
