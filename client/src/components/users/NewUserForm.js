import { useState } from 'react'
const axios = require('axios')

const NewUserForm = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()

    // error check

    // post data to server
    axios.post('/auth/signup', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password
    }).then((res) => console.log('NEW USER POST RES:', res))
      .catch((e) => console.error('NEW USER POST ERROR:,', e))
  }

  return (
    <form id="new-user-form" onSubmit={onFormSubmit}>
      <label className="form-label" htmlFor="input-firstname">
        First Name
      </label>
      <input 
        id="input-firstname"
        className="form-input"
        placeholder="John"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label className="form-label" htmlFor="input-lastname">
        Last Name
      </label>
      <input 
        id="input-lastname"
        className="form-input"
        placeholder="Doe"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label className="form-label" htmlFor="input-email">
        Email
      </label>
      <input 
        id="input-email"
        className="form-input"
        placeholder="johndoe@example.com"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

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
        value="Submit"
      />
    </form>
  )
}

export default NewUserForm