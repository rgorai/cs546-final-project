const express = require('express');
const router = express.Router();
const movieData = require("../data/movies");

router.get("/", async(req, res) =>{
    try{
        let movieList = await movieData.getAll();
        res.status(200).json(movieList);
    } catch(e){
        res.status(500).json({error: e});
    }
});

router.get("/:id", async(req, res) =>{
    try{
        let movie = await movieData.getB(req.params.id);
        res.status(200).json(movie);
    } catch(e){
        res.status(404).json({error: e});
    }
});

router.get("/name/:name", async(req, res) =>{
    try{
        let movie = await movieData.getByName(req.params.name);
        res.status(200).json(movie);
    } catch(e){
        res.status(404).json({error: e});
    }
});

router.get("/genre/:genre", async(req, res) =>{
    try{
        let movie = await movieData.getByGenre(req.params.genre);
        res.status(200).json(movie);
    } catch(e){
        res.status(404).json({error: e});
    }
});

module.exports = router;

