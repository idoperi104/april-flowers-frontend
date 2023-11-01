import { storageService } from "./async-storage.service"
// import { httpService } from './http.service'

import data from "../assets/json/user.json"

// import { store } from '../store/store'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
// import { showSuccessMsg } from './event-bus.service'

const STORAGE_KEY = "user"
const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser"

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getUsers,
  getById,
  remove,
  update,
  getEmptyLoginCred,
  getEmptySignupCred,
  // changeScore,
}

window.userService = userService
// window.loadUsers = loadUsers

async function getUsers(filterBy = { txt: "" }) {
  let users = await storageService.query(STORAGE_KEY)

  if (!users || users.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    users = data
  }

  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, "i")
    users = users.filter((user) => regex.test(user.fullname))
  }
  return users

  // return await httpService.get(`user`, filterBy)
}

// function onUserUpdate(user) {
//   showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
//   // store.dispatch({ type: 'setWatchedUser', user })
// }

async function getById(userId) {
  const user = await storageService.get("user", userId)
  // const user = await httpService.get(`user/${userId}`)

  // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
  // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  return user
}

function remove(userId) {
  return storageService.remove("user", userId)
  // return httpService.delete(`user/${userId}`)
}

async function update(user) {
  console.log("user: ", user)
  const updatedUser = await getById(user._id)
  user = await storageService.put("user", {...updatedUser, ...user})

  // user = await httpService.put(`user/${user._id}`, user)

  // Handle case in which admin updates other user's details
  // if (getLoggedinUser()._id === user._id) _saveLocalUser(user);

  return user

}

async function login(userCred) {
  // console.log("userCred: ", userCred);

  const users = await storageService.query("user")
  const user = users.find(
    (user) =>
      user.username === userCred.username && user.password === userCred.password
  )

  // const user = await httpService.post('auth/login', userCred)

  if (user) {
    // socketService.login(user._id)
    return _saveLocalUser(user)
  }
}

async function signup(userCred) {
  const user = await storageService.post("user", userCred)

  // const user = await httpService.post('auth/signup', userCred)

  // socketService.login(user._id)

  return _saveLocalUser(user)
}

async function logout() {
  localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // socketService.logout()
  // return await httpService.post('auth/logout')
}

function getLoggedinUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    isAdmin: user.isAdmin,
  }
  localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getEmptyLoginCred() {
  return {
    username: "",
    password: "",
  }
}

function getEmptySignupCred() {
  return {
    fullname: "",
    username: "",
    password: "",
    isAdmin: false,
  }
}
