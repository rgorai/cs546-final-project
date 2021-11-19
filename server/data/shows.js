const mongoCollections = require('../config/mongoCollections')
const showCollection = mongoCollections.shows
const { ObjectId } = require('mongodb')

const create = async (
    name,
    releaseDate,
    description,
    number_of_seasons,
    number_of_episodes,
    genres,
    posterPath,
    streamingPlatforms

) => {
  // error check

  // add new show to db
    const shows = await showCollection()
    let newShow = {
        name : name,
        releaseDate : releaseDate,
        description : description,
        number_of_seasons : number_of_seasons,
        number_of_episodes : number_of_episodes,
        genres : genres,
        posterPath : posterPath,
        streamingPlatforms : streamingPlatforms
    }
  // throw if insertion failed
    const insertRet = await shows.insertOne(newShow)
    if (insertRet.insertedCount === 0) throw 'Could not add show'
}

const get = async (showId) => {
    // error check
    if (typeof(showId) !== 'string' || showId.length === 0 || showId === ' '.repeat(showId.length))
      throw 'Error: showId must be a non-empty string.'
    
    // convert id to object
    try {
        showId = ObjectId(showId)
    } catch (e) {
      throw String(e)
    }
  
    // find show
    const shows = await showCollection()
    const show = await shows.findOne({ _id: showId })
  
    if (!show) 
      throw 'Error: failed to find show.'
  
    return { ...show, _id: show._id.toString() }
  }
  
  const getAll = async (x) => {
    // error check
    if (typeof(x) !== 'undefined')
      throw 'Error: no parameters should be given.'
  
    // get and return all shows
    const shows = await showCollection()
    return await shows.find({}).map((e) => ({ 
      ...e, 
      _id: e._id.toString(),
    })).toArray()
  }
  
  const getByGenre = async (str) => {
    // error check
  
    // get all shows of given genre
    // mongo
  
  }

module.exports = {
    create,
    get,
    getAll
}