const movieRoutes = require('./movies')
const showRoutes = require('./shows')
const reviewRoutes = require('./reviews')
const userRoutes = require('./users')
const authRoutes = require('./auth')

const constructorMethod = (app) => {
  app.use('/movies', movieRoutes)
  app.use('/shows', showRoutes)
  app.use('/reviews', reviewRoutes)
  app.use('/users', userRoutes)
  app.use('/auth', authRoutes)

  app.use('*', (req, res) => {
    res.sendStatus(404)
  })
}

module.exports = constructorMethod
