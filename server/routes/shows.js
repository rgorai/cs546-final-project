const express = require('express')
const router = express.Router()
const { get, getAll, getByGenre } = require('../data/shows')


//route to get all tv shows
router.get('/', async (req, res) => {
  // error check

  // send all shows
  try {
    res.status(200).json(await getAll())
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

//route to get tv shows of a specific id
router.get('/:id', async (req, res) => {
  const showId = req.params.id

  // error check
  if (
    typeof showId !== 'string' ||
    showId.length === 0 ||
    showId === ' '.repeat(showId.length)
  ) {
    res.status(400).json({ error: 'no parameters should be given.' })
    return
  }

  // send requested show
  try {
    res.status(200).json(await get(showId))
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

//route to get tv show of a specific name
router.get('/name/:name', async (req, res) => {
  try {
    let show = await getByName(req.params.name)
    res.status(200).json(show)
  } catch (e) {
    res.status(404).json({ error: e })
  }
})

//route to get all tv shows of a specific genre
router.get('/genre/:genre', async (req, res) => {
  try {
    let show = await getByGenre(req.params.genre)
    res.status(200).json(show)
  } catch (e) {
    res.status(404).json({ error: e })
  }
})

module.exports = router
