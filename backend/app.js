const express = require('express')
const healthRoutes = require('./controllers/health')

const app = express()
app.use(express.json())

app.use('/api/health', healthRoutes)

app.all('*', (req, res, next) => {
    res.status(404).send({ message: 'path not found' })
})

module.exports = app
