const express = require('express')
const router = express.Router()
const { searchMedia } = require('../data/search')

router.get('/name/:name', async (req, res) => {
    const searchName = req.params.name
    console.log(searchName)
    
    // error check
    if (typeof(searchName) !== 'string' || searchName.length === 0 || searchName === ' '.repeat(searchName.length)){
        res.status(400).json({ error: "Name must be a non-empty string."})
        return
    }

    //search
    try {
        res.status(200).json( await searchMedia(searchName))
    } catch (e) {
        res.status(500).json({ error: String(e) })
    }
})

module.exports = router