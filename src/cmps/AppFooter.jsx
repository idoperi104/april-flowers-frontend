import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from "../store/actions/user.actions"
import { useDispatch, useSelector } from "react-redux"

export function AppFooter() {
  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function onLogout() {
    try {
      dispatch(logout())
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <footer className="app-footer">
      <p>@ APRIL FLOWERS</p>
      <div className="social">
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faInstagram} />
      </div>

      {loggedinUser ? (
        <button className="btn-login" onClick={onLogout}>
          התנתק
        </button>
      ) : (
        <NavLink to="/login">
          <button className="btn-login">כניסת מנהל</button>
        </NavLink>
      )}
    </footer>
  )
}
