const connection = require('../config/mongoConnection')
const axios = require('axios')
const { create: createMovie } = require('../data/movies')

const tmdbApiKey = '?api_key=31cc954c3de9a91aecd102e07e4d4707'
const tmbdUrl = 'https://api.themoviedb.org/3/movie/'

const getMovie = async (movieId) => {
  try {
    const { data } = await axios.get(tmbdUrl + movieId + tmdbApiKey)
    return data
  } catch(e) {
    console.error(e)
  }
}

const main = async () => {
  const db = await connection.connectToDb()
  await db.dropDatabase()

  console.log(await getMovie('14607'))
  
  console.log('Done seeding database');
  connection.closeConnection()
}

main()
