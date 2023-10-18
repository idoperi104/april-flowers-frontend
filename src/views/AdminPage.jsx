import { Outlet } from "react-router-dom"
import { AdminSideBar } from "../cmps/admin/AdminSideBar"

export function AdminPage() {
  return (
    <section className="admin-page">
      <AdminSideBar />

      <section className="admin-main-container">
        <Outlet />
      </section>
    </section>
  )
}
