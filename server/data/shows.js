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
        streamingPlatforms : streamingPlatforms,
        overallRating : 0, //initializing overallRating to be 0 when a show is created
        reviews : [] //initializing review as empty array
    }
  // throw if insertion failed
    const insertRet = await shows.insertOne(newShow)
    if (insertRet.insertedCount === 0) throw 'Could not add show'

    return await get(insertRet.insertedId.toString())
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
  
  const getByGenre = async (genre) => {
    // error check
    if (typeof(genre) !== 'string' || genre.length === 0 || genre === ' '.repeat(genre.length))
      throw 'Error: Genre name must be a non-empty string.'

    // get all shows of given genre
    const showsList = await getAll()
    let showsbyGenre = []
    showsList.forEach(e => {
        if(e.genres.find(i => i.name === genre)){
          showsbyGenre.push(e)
        }
    });
    return showsbyGenre  
  }

module.exports = {
    create,
    get,
    getAll,
    getByGenre
}

//Show object example: https://api.themoviedb.org/3/tv/1668?api_key=eafd486601fa7c42b1dd9d374c56f365&language=en-US
//Show Provider Object example: https://api.themoviedb.org/3/tv/1668/watch/providers?api_key=31cc954c3de9a91aecd102e07e4d4707
//Movie object example: https://api.themoviedb.org/3/movie/18?api_key=31cc954c3de9a91aecd102e07e4d4707&append_to_response=videos,release_dates
//Show provider object example: https://api.themoviedb.org/3/tv/1668/watch/providers?api_key=31cc954c3de9a91aecd102e07e4d4707
