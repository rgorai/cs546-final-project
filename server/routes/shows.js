const express = require('express')
const router = express.Router()
const { get, getAll, getByName, getByGenre} = require('../data/shows')

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

  // send requested show
  try {
    res.status(200).json(await get(showId))
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

router.get("/name/:name", async(req, res) =>{
  try{
      let show = await getByName(req.params.name);
      res.status(200).json(show);
  } catch(e){
      res.status(404).json({error: e});
  }
})

router.get("/genre/:genre", async(req, res) =>{
  try{
      let show = await getByGenre(req.params.genre);
      res.status(200).json(show);
  } catch(e){
      res.status(404).json({error: e});
  }
});

module.exports = router
