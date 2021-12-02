const movieRoutes = require('./movies')
const showRoutes = require('./shows')
const reviewRoutes = require('./reviews')
const userRoutes = require('./users')
const authRoutes = require('./auth')
const searchRoutes = require('./search')

const constructorMethod = (app) => {
  app.use('/api/movies', movieRoutes)
  app.use('/api/shows', showRoutes)
  app.use('/api/reviews', reviewRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/auth', authRoutes)
  app.use('/api/search', searchRoutes)

  app.use('*', (req, res) => {
    res.sendStatus(404)
  })
}

module.exports = constructorMethod
