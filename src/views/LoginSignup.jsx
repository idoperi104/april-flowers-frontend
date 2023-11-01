import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUsers, login, logout, signup } from "../store/actions/user.actions"
import { useForm } from "../customHooks/useForm"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router-dom"

export function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true)

  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginCred, handleChangeLogin, setLoginCred] = useForm(
    userService.getEmptyLoginCred()
  )
  const [signupCred, handleChangeSignup, setSignupCred] = useForm(
    userService.getEmptySignupCred()
  )

  useEffect(() => {
    // dispatch(loadUsers())
  }, [])

  useEffect(() => {
    setLoginCred({ ...userService.getEmptyLoginCred() })
    setSignupCred({ ...userService.getEmptySignupCred() })
  }, [loggedinUser])

  async function onLogin(ev) {
    ev.preventDefault()
    if (!loginCred.username || !loginCred.password) return
    try {
      dispatch(login({ ...loginCred }))
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  async function onSignUp(ev) {
    ev.preventDefault()
    if (!signupCred.username || !signupCred.password || !signupCred.fullname)
      return
    try {
      dispatch(signup({ ...signupCred }))
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  async function onLogout() {
    try {
      dispatch(logout())
    } catch (err) {
      console.error(err)
    }
  }

  function toogleIsLogin() {
    setIsLogin((prevIsLogin) => !prevIsLogin)
  }

  return (
    <section className="login-signup">
      {isLogin ? (
        <form onSubmit={onLogin} className="basic-form">
          <h3 className="title">כניסת מנהלים</h3>
          <label htmlFor="username">שם משתמש:</label>
          <input
            value={loginCred.username}
            onChange={handleChangeLogin}
            type="text"
            name="username"
            id="usernameLogin"
          />
          <label htmlFor="password">סיסמה:</label>
          <input
            value={loginCred.password}
            onChange={handleChangeLogin}
            type="password"
            name="password"
            id="passwordLogin"
          />
          <button className="btn-submit">כניסה</button>
        </form>
      ) : (
        <form onSubmit={onSignUp} className="basic-form">
          <h3 className="title">רישום משתמש חדש</h3>
          <label htmlFor="fullname">שם מלא:</label>
          <input
            value={signupCred.fullname}
            onChange={handleChangeSignup}
            type="text"
            name="fullname"
            id="fullnameSignup"
          />
          <label htmlFor="username">שם משתמש:</label>
          <input
            value={signupCred.username}
            onChange={handleChangeSignup}
            type="text"
            name="username"
            id="usernameSignup"
          />
          <label htmlFor="password">סיסמה:</label>
          <input
            value={signupCred.password}
            onChange={handleChangeSignup}
            type="password"
            name="password"
            id="passwordSignup"
          />
          <button className="btn-submit">רישום</button>
        </form>
      )}

      <button className="btn-full" onClick={toogleIsLogin}>
        {isLogin ? "רישום משתמש חדש" : "כניסת מנהל"}
      </button>
    </section>
  )
}
