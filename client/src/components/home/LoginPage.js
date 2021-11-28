import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'

const LoginPage = (props) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginRes, setLoginRes] = useState({})
  const [error, setError] = useState({})

  const onFormSubmit = (e) => {
    e.preventDefault()

    // error check
    // try using 'validations'

    // post data to server
    const res = login(username, password)
      .then((res) => {
        console.log('LOGIN RES:', res)
        navigate('/')
      })
      // change to respond with ui
      .catch((e) => console.log('LOGIN ERROR:', e.response.data))
    // console.log('res', res)
  }

  return (
    <>
      {props.loggedIn ? (
        <div>You are already signed in.</div>
      ) : (
        <form id="login-form" onSubmit={onFormSubmit}>
          <label className="form-label" htmlFor="input-username">
            Username
          </label>
          <input
            id="input-username"
            className="form-input"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="form-label" htmlFor="input-password">
            Password
          </label>
          <input
            id="input-password"
            className="form-input"
            placeholder="Password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="form-submit" type="submit" form="login-form">
            Login
          </button>
        </form>
      )}
    </>
  )
}

export default LoginPage
