const express = require('express')
const router = express.Router()
const { get, getAll } = require('../data/shows')

router.get('/', async (req, res) => {
  // error check
  
  // send all shows
  try {
    res.status(200).json(await getAll())
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

router.get('/:id', async (req, res) => {
  const showId = req.params.id
  
  // error check
  if (typeof(showId) !== 'string' || showId.length === 0 || showId === ' '.repeat(showId.length)){
    res.status(400).json({ error: "no parameters should be given."})
    return
  }

  // send requested show
  try {
    res.status(200).json(await get(showId))
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

module.exports = router
