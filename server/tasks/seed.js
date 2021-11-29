const connection = require('../config/mongoConnection')

const moviesGenreList = require('./movies_genre_list.json')
const showsGenreList = require('./tv_series_genre_list.json')

const { create: createMovie } = require('../data/movies')
const { create: createShow } = require('../data/shows')
const { getMovieData, getShowData } = require('./utils')

const NUM_MEDIA = 50

/*
 * API data requirements:
 * This is to help populate the database with more complete data (less empty fields)
 * This will only work with top-level properties of the API response
 *
 * Format:
 * {
 *  property_name: N = maximum number of empty values allowed
 * }
 *
 * Ex:
 * {
 *  poster_path: 5
 * }
 * There will be a maximum of 5 movies with no poster_path added
 * This number should be decided in regards to NUM_MEDIA
 *
 */
const movieReqs = {
  poster_path: 5,
  overview: 5,
  genres: 0,
  providers: 5,
}
const showReqs = {
  poster_path: 2,
  overview: 2,
  genres: 0,
}

const main = async () => {
  const db = await connection.connectToDb()
  await db.dropDatabase()

  // time seeding
  console.time('Time')

  // create movie entries
  const movieData = await getMovieData(NUM_MEDIA, movieReqs)
  for (const data of movieData) await createMovie(...data)

  // create show entries
  const showData = await getShowData(NUM_MEDIA, showReqs)
  for (const data of showData) await createShow(...data)

  console.log('\nDone seeding database')
  console.timeEnd('Time')
  connection.closeConnection()
}

main().catch((e) => {
  console.error(e)
  connection.closeConnection()
})
