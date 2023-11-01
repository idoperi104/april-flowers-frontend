import { Outlet, useNavigate } from "react-router-dom"
import { AdminSideBar } from "../cmps/admin/AdminSideBar"
import { useDispatch, useSelector } from "react-redux"
import { setIsCartOpen } from "../store/actions/cart.actions"
import { useEffect } from "react"
import { LoginSignup } from "./LoginSignup"

export function AdminPage() {
  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )

  const navigate = useNavigate()

  if (!loggedinUser?.isAdmin) return <LoginSignup/>
  return (
    <section className="admin-page">
      <AdminSideBar />

      <section className="admin-main-container">
        <Outlet />
      </section>
    </section>
  )
}
