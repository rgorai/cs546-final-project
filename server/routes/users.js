const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/auth')
const { getUser } = require('../data/users')

router.get('/profile', verifyToken, async (req, res) => {
  // error check

  // get user info
  try {
    res.status(200).json(await getUser(req.userId))
  } catch (e) {
    res.status(404).send('User Error')
  }
})

// use verifyToken for things that need authentication:
// adding to watchlist
// removing from watchlist
// creating a review
// deleting a review
// liking/disliking a movie

module.exports = router
