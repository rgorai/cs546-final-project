import { useState, useEffect } from 'react'
import ReactSession from 'react-client-session/dist/ReactSession'
const axios = require('axios')

const LoginPage = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginRes, setLoginRes] = useState({})
  const [error, setError] = useState({})

  useEffect(() => {
    console.log(loginRes)
    if (loginRes.authenticated) {
      ReactSession.set('userId', loginRes.userId)
      console.log('authenicated')
    } else {
      ReactSession.set('userId', null)
      console.log('not authenticated')
    }
  }, [loginRes])

  const onFormSubmit = (e) => {
    e.preventDefault()

    // error check

    // post data to server
    axios.post('/users/authenticate', {
      username: username,
      password: password,
    }).then((res) => setLoginRes(res.data))
      // ui error
      .catch((e) => console.error('AUTH USER POST ERROR:', e))
  }

  return (
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

      <input 
        className="form-submit"
        type="submit"
        value="Login"
      />
    </form>
  )
}

export default LoginPage