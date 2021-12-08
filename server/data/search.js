const mongoCollections = require('../config/mongoCollections')
const movieCollection = mongoCollections.movies
const showCollection = mongoCollections.shows
const movieFunc = require('./movies')
const showFunc = require('./shows')
const { ObjectId } = require('mongodb')

//collection.find({name: `/${query}/i`}).toArray();

//func to search movies and tv shows of a specific keyword entered in the search bar
const searchMedia = async (query) => {
  // error check
  if (
    typeof query !== 'string' ||
    query.length === 0 ||
    query === ' '.repeat(query.length)
  )
    throw 'Error: name must be a non-empty string.'

  //search
  const movieList = await movieCollection()
  const showsList = await showCollection()
  let searchResult = {}
  searchResult['movieResult'] = await movieList
    .find({ name: { $regex: `${query}`, $options: 'i' } })
    .toArray()
  searchResult['showResult'] = await showsList
    .find({ name: { $regex: `${query}`, $options: 'i' } })
    .toArray()

  return searchResult
}

const autoComplete = async () => {
  // error check

  let mList = await movieFunc.getAll()
  let sList = await showFunc.getAll()

  let searchAutoResult = {}
  searchAutoResult['movieResult'] = mList
  searchAutoResult['showResult'] = sList
  
  return searchAutoResult
}

module.exports = { searchMedia, autoComplete }
