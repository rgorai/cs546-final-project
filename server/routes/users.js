const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb')
const { addToWatchlist, deleteFromWatchlist } = require('../data/users')
const { verifyToken } = require('../middleware/auth')
const { getUser } = require('../data/users')

function checkIsString(s) {
  if (typeof s != 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

router.get('/profile', verifyToken, async (req, res) => {
  // error check
  try {
    res.status(200).json(await getUser(req.userId))
  } catch (e) {
    res.sendStatus(500)
  }
})

router.put('/profile', verifyToken, async (req, res) => {
  // error check
  // req.userId

  try {
    res.status(200).json(await getUser(req.userId))
  } catch (e) {
    res.sendStatus(500)
  }
})

// adding to watchlist
router.put('/watchlist', verifyToken, async (req, res) => {
  //error checking
  let { itemId } = req.body
  let userId = req.userId

  try {
    userId = ObjectId(userId)
    itemId = ObjectId(itemId)
  } catch (e) {
    return res.status(400).send('invalid object id')
  }

  try {
    let user = await addToWatchlist(userId, itemId)
    res.status(200).json(user)
  } catch (e) {
    res.status(400).send(String(e))
  }
})

// removing from watchlist
router.delete('/watchlist/:id', verifyToken, async (req, res) => {
  let { itemId } = req.body
  let userId = req.userId

  try {
    userId = ObjectId(userId)
    itemId = ObjectId(itemId)
  } catch (e) {
    return res.status(400).send('invalid object id')
  }

  try {
    let user = await addToWatchlist(userId, itemId)
    res.status(200).json(user)
  } catch (e) {
    res.status(400).send(String(e))
  }
})

module.exports = router
