import axios from 'axios'

const signup = async (firstName, lastName, email, username, password) => {
  return await axios
    .post('/api/auth/signup', {
      firstName,
      lastName,
      email,
      username,
      password,
    })
    .then((res) => login(username, password))
}

const login = async (username, password) => {
  return await axios
    .post('/api/auth/login', { username, password })
    .then((res) => {
      if (res.data.access_token)
        localStorage.setItem('user', JSON.stringify(res.data))
      return res.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
}

const getCurrUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export { signup, login, logout, getCurrUser }
