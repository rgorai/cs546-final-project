const express = require('express')
const router = express.Router()
const { searchMedia } = require('../data/search')

//route to get the list of search results
router.get('/:query', async (req, res) => {
  const searchName = req.params.query
  // error check
  if (
    typeof searchName !== 'string' ||
    searchName.length === 0 ||
    searchName === ' '.repeat(searchName.length)
  ) {
    res.status(400).json({ error: 'Name must be a non-empty string.' })
    return
  }

  //search
  try {
    let result = await searchMedia(searchName)
    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

module.exports = router
