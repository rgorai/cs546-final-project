const express = require('express')
const app = express()
const configRoutes = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

configRoutes(app)

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001')
})
