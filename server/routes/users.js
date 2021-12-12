const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb')
const {
  addToWatchlist,
  deleteFromWatchlist,
  updateUser,
} = require('../data/users')
const { verifyToken } = require('../middleware/auth')
const { getUser, updateUser } = require('../data/users')

function checkIsString(s) {
  if (typeof s != 'string') throw 'Given input is invalid'
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

router.get('/profile', verifyToken, async (req, res) => {
  // error check
  try {
    if (!req.userId) throw 'must provide user Id'
    ObjectId(req.userId)
  } catch (e) {
    return res.status(400).send(String(e))
  }
  try {
    res.status(200).json(await getUser(req.userId))
  } catch (e) {
    res.status(500).send(String(e))
  }
})

router.put('/profile', verifyToken, async (req, res) => {
  // error check
  let { firstName } = req.body
  let { lastName } = req.body
  let { email } = req.body
  let { username } = req.body
  let { password } = req.body

  try {
    if (!firstName) throw 'Must provide the first name'
    if (!lastName) throw 'Must provide the last name'
    if (!email) throw 'Must provide the email'
    if (!username) throw 'Must provide the username'
    if (!password) throw 'Must provide the password'

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

  let userId = req.userId
  try {
    if (!userId) throw 'must provide user Id'
    userId = ObjectId(userId)
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    let user = await updateUser(
      userId,
      firstName,
      lastName,
      email,
      username,
      password
    )
    res.status(200).json(user)
  } catch (e) {
    res.status(500).send(String(e))
  }
})

// adding to watchlist
router.put('/watchlist', verifyToken, async (req, res) => {
  //error checking
  let { itemId } = req.body
  let userId = req.userId

  try {
    if (!itemId) throw 'must provide itemId'
    userId = ObjectId(userId)
    itemId = ObjectId(itemId)
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    let user = await addToWatchlist(userId, itemId)
    res.status(200).json(user)
  } catch (e) {
    res.status(500).send(String(e))
  }
})

// removing from watchlist
router.delete('/watchlist', verifyToken, async (req, res) => {
  let { itemId } = req.body
  let userId = req.userId

  try {
    if (!itemId) throw 'must provide itemId'
    userId = ObjectId(userId)
    itemId = ObjectId(itemId)
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    let user = await deleteFromWatchlist(userId, itemId)
    res.status(200).json(user)
  } catch (e) {
    res.status(500).send(String(e))
  }
})

module.exports = router
