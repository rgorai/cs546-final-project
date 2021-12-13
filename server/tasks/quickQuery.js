const connection = require('../config/mongoConnection')
const { getMovie, getShow } = require('./utils')

const NUM_MEDIA = 10

// think about including backdrop on moviepage

const main = async () => {
  const db = await connection.connectToDb()
  await db.dropDatabase()
  // const movie = await getMovie('225760')
  // console.log(movie.release_dates)

  // const l = [2, 4, 1, 5, 7, 3, 9]
  // const t = [...l].sort()
  // console.log(l, t)
  connection.closeConnection()
}

main().catch((e) => {
  console.error(e)
})
