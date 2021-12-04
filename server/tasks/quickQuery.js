const { getMovie, getShow } = require('./utils')

const NUM_MEDIA = 10

// think about including backdrop on moviepage

const main = async () => {
  const movie = await getMovie('22843')

  console.log(movie.revenue)
}

main().catch((e) => {
  console.error(e)
})
