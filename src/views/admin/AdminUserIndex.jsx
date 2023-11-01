import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUsers, toggleIsAdmin } from "../../store/actions/user.actions"

export function AdminUserIndex() {
  const users = useSelector((storeState) => storeState.userModule.users)
  const loggedinUser = useSelector((storeState) => storeState.userModule.loggedinUser)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUsers())
    return () => {}
  }, [])

  useEffect(() => {
  }, [users])

  function onToggleAdmin(user) {
    dispatch(toggleIsAdmin(user))
  }

  if (!users) return <div>Loading...</div>
  return (
    <section className="admin-user-index">
      <h2 className="title">שלום, {loggedinUser.fullname}</h2>
      <h2 className="title">רשימת משתמשים:</h2>
      <AdminUserList users={users} onToggleAdmin={onToggleAdmin} />
    </section>
  )
}

function AdminUserList({ users, onToggleAdmin }) {
  return (
    <li className="admin-user-list clean-list">
      {users.map((user) => (
        <AdminUserPreview
          key={user._id}
          user={user}
          onToggleAdmin={onToggleAdmin}
        />
      ))}
    </li>
  )
}

function AdminUserPreview({ user, onToggleAdmin }) {
  function getClass() {
    if (user.isAdmin) return "admin"
  }

  return (
    <ul className={`admin-user-preview ${getClass()}`}>
      <h3 className="name">
        <span>שם: </span>
        {user.fullname}
      </h3>
      <h3 className="name">
        <span>שם משתמש: </span>
        {user.fullname}
      </h3>
      <button className="btn" onClick={() => onToggleAdmin(user)}>
        {user.isAdmin ? "הסר מניהול" : "הפוך למנהל"}
      </button>
    </ul>
  )
}
