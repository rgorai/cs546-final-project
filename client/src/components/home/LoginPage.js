import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'
import '../../styles/home/loginPage.css'

const LoginPage = (props) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)

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

  const onFormSubmit = (e) => {
    e.preventDefault()

    // error check
    // try using 'validations'
    if (!username) throw 'You must provide a username'
    if (!password) throw 'You must provide a password'

    username = username.toLowerCase().trim()

    try {
      checkIsString(username)
      checkIsString(password)

      checkIsUsername(username)
      checkIsPassword(password)
    } catch (e) {
      throw String(e)
    }

    // post data to server
    login(username, password)
      .then((_) => {
        navigate('/')
        window.location.reload()
      })
      .catch((e) => setError(e.response))
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

          <button type="submit" form="login-form">
            Login
          </button>
        </form>
      )}
    </div>
  )
}

export default LoginPage
