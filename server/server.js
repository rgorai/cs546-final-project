const express = require('express')
const app = express()
const cors = require('cors')
const configRoutes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

configRoutes(app)

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001')
})
