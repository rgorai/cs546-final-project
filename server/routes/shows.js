const express = require('express')
const router = express.Router()
const {
  get,
  getAll,
  getAllByGenre,
  getAllByProvider,
  getByName,
  getByGenre,
  getByTrending,
} = require('../data/shows')

function checkIsString(s) {
  if (typeof s != 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

router.get('/', async (req, res) => {
  // send all shows
  console.log('here')
  try {
    res.status(200).json(await getAll())
  } catch (e) {
    res.status(500).send(String(e))
  }
})

//route to get all tv shows of a specific genre
router.get('/bygenre', async (req, res) => {
  // send all shows by genre
  try {
    res.status(200).json(await getAllByGenre())
  } catch (e) {
    res.status(500).send(String(e))
  }
})

//route to get tv shows of a provider
router.get('/byprovider', async (req, res) => {
  // send all shows by provider
  try {
    res.status(200).json(await getAllByProvider())
  } catch (e) {
    res.status(500).send(String(e))
  }
})

router.get('/bytrending', async (req, res) => {
  // send all movies by genre
  try {
    res.status(200).json(await getByTrending())
  } catch (e) {
    res.status(500).send(String(e))
  }
})

//route to get tv shows of a specific id
router.get('/:id', async (req, res) => {
  let showId = req.params.id
  console.log('here')

  // error check
  if (
    typeof showId !== 'string' ||
    showId.length === 0 ||
    showId === ' '.repeat(showId.length)
  ) {
    res.status(400).send('showId must be a non-empty string.')
    return
  }

  showId = showId.toLowerCase().trim()

  // send requested show
  try {
    res.status(200).json(await get(showId))
  } catch (e) {
    res.status(404).send(String(e))
  }
})

//route to get tv show of a specific name
router.get('/name/:name', async (req, res) => {
  const showName = req.params.name
  // error checking
  if (!showName) throw 'Must provide a show name'

  try {
    checkIsString(showName)
  } catch (e) {
    res.status(404).send(String(e))
  }

  //showName = showName.toLowerCase().trim()

  try {
    let show = await getByName(showName)
    res.status(200).json(show)
  } catch (e) {
    res.status(404).send(String(e))
  }
})

//route to get tv shows of a specific genre
router.get('/genre/:genre', async (req, res) => {
  // error check
  const genre = req.params.genre
  if (!genre) throw 'Must provide a genre'

  try {
    checkIsString(genre)
  } catch (e) {
    res.status(404).send(String(e))
  }

  // genre = genre.toLowerCase().trim()

  try {
    let show = await getByGenre(genre)
    res.status(200).json(show)
  } catch (e) {
    res.status(404).send(String(e))
  }
})

module.exports = router
