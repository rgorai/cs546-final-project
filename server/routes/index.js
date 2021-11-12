const movieRoutes = require('./movies')
const showRoutes = require('./shows')
const userRoutes = require('./users')
const reviewRoutes = require('./reviews')

const constructorMethod = (app) => {
  app.use('/movies', movieRoutes)
  app.use('/shows', showRoutes)
  app.use('/users', userRoutes)
  app.use('/reviews', reviewRoutes)

  app.use('*', (req, res) => {
    res.sendStatus(404)
  })
}

module.exports = constructorMethod
