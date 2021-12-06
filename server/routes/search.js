const express = require('express')
const router = express.Router()
const { searchMedia,autoComplete } = require('../data/search')

//route to get the list of search results
router.get('/:query', async (req, res) => {
  const searchName = req.params.query
  // error check
  if (
    typeof searchName !== 'string' ||
    searchName.length === 0 ||
    searchName === ' '.repeat(searchName.length)
  ) {
    res.status(400).send('Name must be a non-empty string.')
    return
  }

  //search
  try {
    let result = await searchMedia(searchName)
    res.status(200).json(result)
  } catch (e) {
    res.status(500).send(String(e))
  }
})

router.get('/autocomplete/list', async (req, res) => {

  //search
  try {
    let result = await autoComplete()
    res.status(200).json(result)
  } catch (e) {
    res.status(500).send(String(e))
  }
})

module.exports = router
