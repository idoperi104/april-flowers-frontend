import { Outlet } from "react-router-dom"
import { AdminSideBar } from "../cmps/admin/AdminSideBar"
import { useDispatch } from "react-redux"
import { setIsCartOpen } from "../store/actions/cart.actions"
import { useEffect } from "react"

export function AdminPage() {
  const dispatch = useDispatch()

  return (
    <section className="admin-page">
      <AdminSideBar />

      <section className="admin-main-container">
        <Outlet />
      </section>
    </section>
  )
}
