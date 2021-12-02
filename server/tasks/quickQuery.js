const { getMovieData } = require('./utils')

const NUM_MEDIA = 10

// think about including backdrop on moviepage

const main = async () => {
  let o = {
    a: 'a',
    b: 'b',
  }

  console.log(o)
  let { a, b } = o
  a = 1
  b = 2
  console.log(o)
}

main().catch((e) => {
  console.error(e)
})
