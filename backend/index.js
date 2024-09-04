const config = require('./config') 
const { connectToMongo, disconnectFromMongo } = require('./db/mongodb')
const app = require('./app')

connectToMongo(config.mongodb.connectionUri)

const server = app.listen(config.server.port, config.server.host, () => {
    console.log(`Server running at ${config.server.host}:${config.server.port}`)
})

// Grecufull shutdown hook
const gracefulShutdown = () => {
    console.log('Received termination signal, shutting down...')
    server.close(() => {
        console.log('Server closed')
        disconnectFromMongo()
    })
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)