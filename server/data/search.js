const mongoCollections = require('../config/mongoCollections')
const movieCollection = mongoCollections.movies
const showCollection = mongoCollections.shows
const movieFunc = require('./movies')
const showFunc = require('./shows')
const { ObjectId } = require('mongodb')


//collection.find({name: `/${query}/i`}).toArray();

const searchMedia = async (query) => {
// error check
if (typeof(query) !== 'string' || query.length === 0 || query === ' '.repeat(query.length))
    throw 'Error: name must be a non-empty string.'

//search
const movieList = await movieCollection()
const showsList = await showCollection()
let searchResult = {}
searchResult['movieResult'] = await movieList.find({name: {$regex: `^${query}`, $options:'i'}}).toArray()
searchResult['showResult'] = await showsList.find({name: {$regex: `^${query}`, $options:'i'}}).toArray()

if (searchResult.movieResult.length === 0 && searchResult.showResult.length === 0)
    throw 'No result found!'

return searchResult
}

module.exports = {searchMedia}