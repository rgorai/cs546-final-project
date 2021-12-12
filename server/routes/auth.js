const express = require('express')
const router = express.Router()
const { create, authenticateUser } = require('../data/users')
const { isLoggedIn } = require('../middleware/auth')

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

router.post('/signup', isLoggedIn, async (req, res) => {
  let { firstName, lastName, email, username, password } = req.body

  // error check
  if (!(firstName && lastName && email && username && password))
    return res.status(400).send('You must provide all values.')

  firstName = firstName.trim()
  lastName = lastName.trim()
  email = email.toLowerCase().trim()
  username = username.toLowerCase().trim()
  password = password.trim()

  try {
    checkIsString(firstName)
    checkIsString(lastName)
    checkIsString(email)
    checkIsString(username)
    checkIsString(password)

    checkIsName(firstName)
    checkIsName(lastName)

    checkIsEmail(email)
    checkIsUsername(username)
    checkIsPassword(password)
  } catch (e) {
    return res.status(400).send(String(e))
  }

  // create new user
  try {
    res
      .status(200)
      .json(await create(firstName, lastName, email, username, password))
  } catch (e) {
    res.sendStatus(500)
  }
})

router.post('/login', isLoggedIn, async (req, res) => {
  let { username, password } = req.body

  // error check
  if (!(username && password))
    return res.status(400).send('You must provide all values.')

  username = username.toLowerCase().trim()

  try {
    checkIsString(username)
    checkIsString(password)

    checkIsUsername(username)
    checkIsPassword(password)
  } catch (e) {
    return res.status(400).send(String(e))
  }

  // authenticate user
  try {
    const auth = await authenticateUser(username, password)
    if (auth.authenticated) res.status(200).json(auth)
    else res.status(401).send('Invalid username or password')
  } catch (e) {
    res.status(500).send(String(e))
  }
})

module.exports = router
