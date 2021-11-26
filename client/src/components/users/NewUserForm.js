import { useState } from 'react'
import axios from 'axios'
import { signup } from '../../services/authService'

const NewUserForm = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [signupError, setSignupError] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()

    // error check

    // post data to server
    const res = signup(
      firstName,
      lastName,
      email,
      username,
      password
    ).then((res) => console.log('NEW USER RES:', res))
      // change to respond with ui
      .catch((e) => console.log('NEW USER ERROR:', e.response.data))
  }

  return (
    <div>
      {props.loggedIn
        ? <div>You are already signed in.</div>
        : <form id="new-user-form" onSubmit={onFormSubmit}>
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

            <button 
              className="form-reset"
              type="reset"
              form="new-user-form"
            >
              Reset
            </button>

            <button 
              className="form-submit"
              type="submit"
              form="new-user-form"
            >
              Submit
            </button>
          </form>
      }
    </div>
  )
}

export default NewUserForm