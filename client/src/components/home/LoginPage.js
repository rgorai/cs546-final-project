/* eslint-disable no-throw-literal */
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from '../../services/authService'
import '../../styles/home/loginPage.css'

function checkIsString(s) {
  if (typeof s !== 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

function checkIsUsername(s) {
  if (s.length < 4) throw 'Given username size is less than 4'
}

function checkIsPassword(s) {
  if (s.length < 8) throw 'Given password size is less than 8'
}

const LoginPage = (props) => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Login'
  }, [])

  const onFormSubmit = (e) => {
    e.preventDefault()

    // error check
    try {
      checkIsString(username)
      checkIsString(password)
      checkIsUsername(username)
      checkIsPassword(password)
    } catch (e) {
      return setError('Invalid username or password')
    }

    // post data to server
    login(username, password)
      .then((_) => {
        navigate(state.from ? state.from : '/')
        window.location.reload()
      })
      .catch((e) => {
        console.log(e)
        setError(e.response.data)
      }) // get error from server
  }

  return (
    <div className="login-container">
      {props.loggedIn ? (
        <div>You are already signed in.</div>
      ) : (
        <form id="login-form" onSubmit={onFormSubmit}>
          <div className="user-input-container">
            <input
              id="input-username"
              placeholder="Username or Email"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <label htmlFor="input-username">Username</label>
          </div>

          <div className="user-input-container">
            <input
              id="input-password"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="input-password">Password</label>
          </div>

          {/* display error here */}
          {error && <div className="login-error">{error}</div>}

          <button type="submit" form="login-form">
            Login
          </button>
        </form>
      )}
    </div>
  )
}

export default LoginPage
