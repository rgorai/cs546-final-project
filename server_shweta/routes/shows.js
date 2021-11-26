const express = require('express');
const router = express.Router();
const showData = require("../data/shows");

router.get("/", async(req, res) =>{
    try{
        let showList = await showData.getAll();
        res.status(200).json(showList);
    } catch(e){
        res.status(500).json({error: e});
    }
});

router.get("/:id", async(req, res) =>{
    try{
        let show = await showData.get(req.params.id);
        res.status(200).json(show);
    } catch(e){
        res.status(404).json({error: e});
    }
});

router.get("/name/:name", async(req, res) =>{
    try{
        let show = await showData.getByName(req.params.name);
        res.status(200).json(show);
    } catch(e){
        res.status(404).json({error: e});
    }
});

router.get("/genre/:genre", async(req, res) =>{
    try{
        let show = await showData.getByGenre(req.params.genre);
        res.status(200).json(show);
    } catch(e){
        res.status(404).json({error: e});
    }
});

module.exports = router;

