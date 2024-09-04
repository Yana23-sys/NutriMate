const express = require('express')

const app = express()
app.use(express.json())

app.all('*', (req, res, next) => {
    res.status(404).send({ message: 'path not found' })
})

module.exports = app
