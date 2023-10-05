import "./App.css"
import './assets/scss/global.scss'
import { Route, HashRouter as Router, Routes, Switch } from "react-router-dom"
import { ProductIndex } from "./views/ProductIndex"
import { AppHeader } from "./cmps/AppHeader"
import { AdminPage } from "./views/AdminPage"

function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />
        <main className="container">
          <Routes>
            <Route path="/" element={<ProductIndex />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
