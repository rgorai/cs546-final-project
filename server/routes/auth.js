const express = require('express')
const router = express.Router()
const { createUser, authenticateUser } = require('../data/users')
const { isLoggedIn } = require('../middleware/auth')

function checkIsString(s) {
  if (typeof s != 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
  if (s.indexOf(' ') >= 0) throw 'Given input has spaces'
}

function checkIsName(s) {
  if (/[^a-zA-Z]/.test(s)) throw 'Given input is not only letters'
  if (s.length < 4) throw 'Given name size is less than 4'
}

function checkIsPassword(s) {
  if (s.length < 8) throw 'Given password size is less than 8'
}

function checkIsEmail(s) {
  if (s.indexOf('@') < 0) throw 'Given email id is invalid'
}

function checkIsUsername(s) {
  if (s.length < 4) throw 'Given username size is less than 4'
}

router.post('/signup', isLoggedIn, async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body

  // error check
  if (!firstName) throw 'You must provide the first name'
  if (!lastName) throw 'You must provide the last name'
  if (!email) throw 'You must provide an email address'
  if (!username) throw 'You must provide a username'
  if (!password) throw 'You must provide a password'

  firstName = firstName.toLowerCase().trim()
  lastName = lastName.toLowerCase().trim()
  email = email.toLowerCase().trim()
  username = username.toLowerCase().trim()
  password = password.toLowerCase().trim()

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

  // create new user
  try {
    const ret = await createUser(firstName, lastName, email, username, password)
    if (ret.error || !ret.userInserted) res.status(400).send(ret.error)
    else res.status(200).send('User created successfully')
  } catch (e) {
    res.status(500).send(String(e))
  }
})

router.post('/login', isLoggedIn, async (req, res) => {
  const { username, password } = req.body

  // error check

  if (!username) throw 'You must provide a username'
  if (!password) throw 'You must provide a password'

  checkIsString(username)
  checkIsString(password)

  checkIsUsername(username)
  checkIsPassword(password)

  username = username.toLowerCase().trim()
  password = password.toLowerCase().trim()

  // authenticate user
  try {
    const ret = await authenticateUser(username, password)
    if (ret.error || !ret.authenticated)
      res.status(401).send('Invalid username or password')
    else res.status(200).json(ret)
  } catch (e) {
    res.status(500).send(String(e))
  }
})

module.exports = router
