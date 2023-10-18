import "./App.css"
import "./assets/scss/global.scss"
import { Route, HashRouter as Router, Routes } from "react-router-dom"
import { ProductIndex } from "./views/ProductIndex"
import { AppHeader } from "./cmps/AppHeader"
import { AdminPage } from "./views/AdminPage"
import { AdminDashboard } from "./views/admin/AdminDashboard"
import { AdminProductIndex } from "./views/admin/AdminProductIndex"
import { AdminProductEdit } from "./views/admin/AdminProductEdit"

function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />
        <main className="container">
          <Routes>
            <Route path="/" element={<ProductIndex />} />

            <Route path="/admin" element={<AdminPage />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductIndex />} />
              <Route path="products/edit/:id?" element={<AdminProductEdit />} />
              <Route path="categories" element={<AdminDashboard />} />
              <Route path="orders" element={<AdminDashboard />} />
              <Route path="admins" element={<AdminDashboard />} />
              <Route path="shipping" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
