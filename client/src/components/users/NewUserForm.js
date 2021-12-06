import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../services/authService'
import '../../styles/users/newUserForm.css'
let errObj = []

function checkIsString(s) {
  if (typeof s !== 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

function checkIsName(s) {
  if (/[^a-zA-Z]/.test(s)) throw 'Given input is not only letters'
}

function checkIsPassword(s) {
  if (s.length < 8) throw 'Given password size is less than 8'
}

function checkIsEmail(s) {
  if (!/^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(s)) throw 'Given email id is invalid'
}

function checkIsUsername(s) {
  if (s.length < 4) throw 'Given username size is less than 4'
}

const NewUserForm = (props) => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)

  const onFormSubmit = (e) => {
    e.preventDefault()

    // error check
    try {
      ;(!firstName)(!lastName)(!email)(!username)(!password)
    } catch (e) {
      // errObj["hasError"] = true
      // errObj["error"] = "Must provide all the items"
    }

    try {
      checkIsString(firstName)
      checkIsString(lastName)
      checkIsString(email)
      checkIsString(username)
      checkIsString(password)

      checkIsName(firstName)
      checkIsName(lastName)

      checkIsUsername(username)

      checkIsPassword(password)
      checkIsEmail(email)
    } catch (E) {
      console.log(e)
      // errObj["hasError"] = true
      // errObj["error"] = e
    }

    // post data to server
    signup(firstName, lastName, email, username, password)
      .then((_) => {
        console.log('in the signa up')
        navigate('/')
        window.location.reload()
      })
      // change to respond with ui
      .catch((e) => setError(e.response))
  }

  return (
    <div className="login-container">
      {/* <div>
        {errObj.hasError && <p>{errObj.error}</p>}            

      </div> */}
      {props.loggedIn ? (
        <div>You are already signed in.</div>
      ) : (
        <form id="new-user-form" onSubmit={onFormSubmit}>
          <div className="user-input-container">
            <input
              id="input-firstname"
              placeholder="John"
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="input-firstname">First Name</label>
          </div>

          <div className="user-input-container">
            <input
              id="input-lastname"
              className="form-input"
              placeholder="Doe"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="form-label" htmlFor="input-lastname">
              Last Name
            </label>
          </div>

          <div className="user-input-container">
            <input
              id="input-email"
              className="form-input"
              placeholder="johndoe@example.com"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="input-email">
              Email
            </label>
          </div>

          <div className="user-input-container">
            <input
              id="input-username"
              className="form-input"
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="form-label" htmlFor="input-username">
              Username
            </label>
          </div>

          <div className="user-input-container">
            <input
              id="input-password"
              className="form-input"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="input-password">
              Password
            </label>
          </div>

          <button className="form-reset" type="reset" form="new-user-form">
            Reset
          </button>

          <button className="form-submit" type="submit" form="new-user-form">
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default NewUserForm
