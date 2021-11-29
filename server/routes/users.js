const express = require('express')
const router = express.Router()
const {
  createUser,
  authenticateUser,
  addToWatchlist,
  deleteFromWatchlist,
} = require('../data/users')
const { verifyToken } = require('../middleware/auth')
const { getUser } = require('../data/users')

function checkIsString(s) {
  if (typeof s != 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

router.get('/', verifyToken, async (req, res) => {
  // console.log(req.userId)
  res.status(200).send('you are authenticated.')
})

// use verifyToken for things that need authentication:
// adding to watchlist
router.put('./:id', verifyToken, async (req, res) => {
  if (!req.params.id)
    throw 'You must specify an ID of the user to update the watchlist'
  let { name } = req.body

  if (!name) {
    res
      .status(400)
      .json({
        error: 'You must provide a movie/ TV show name to add to the watchlist',
      })
  }

  checkIsString(name)

  try {
    let user = await addToWatchlist(name)
    res.status(200).json(user)
  } catch (e) {
    res.status(400).json({ error: e })
  }
})
// removing from watchlist
router.delete('./:id', verifyToken, async (req, res) => {
  if (!req.params.id)
    throw 'You must specify an ID of the user to update the watchlist'
  let { name } = req.body

  if (!name) {
    res
      .status(400)
      .json({
        error:
          'You must provide a movie/ TV show name to delete from the watchlist',
      })
  }

  checkIsString(name)

  try {
    let user = await deleteFromWatchlist(name)
    res.status(200).json(user)
  } catch (e) {
    res.status(400).json({ error: e })
  }
})
// creating a review
// deleting a review
// liking/disliking a movie

module.exports = router
