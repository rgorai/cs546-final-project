const connection = require('../config/mongoConnection')

const { create: createMovie } = require('../data/movies')
const { create: createShow } = require('../data/shows')
const { getMovieData, getShowData } = require('./utils')

const NUM_MEDIA = 50

const main = async () => {
  const db = await connection.connectToDb()
  await db.dropDatabase()

  // create db entries
  const movieData = await getMovieData(NUM_MEDIA)
  for (const data of movieData)
    await createMovie(...data)

  const showData = await getShowData(NUM_MEDIA)
  for (const data of showData)
    await createShow(...data)

  console.log('\nDone seeding database');
  connection.closeConnection()
}

main().catch((e) => {
  console.error(e)
  connection.closeConnection()
})