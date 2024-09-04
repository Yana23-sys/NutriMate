const mongoose = require('mongoose');
const config = require('./config'); 

const connectToMongo = async () => {
    try {
        await mongoose.connect(config.mongodb.connectionUri)
        console.log('Connected to MongoDB')
    }
    catch (error) {
        console.log('Error connecting to MongoDB', error)
        process.exit(1)
    }
}

const disconnectFromMongo = async () => {
    try {
        await mongoose.connection.close()
        console.log('MongoDB disconnected!')
    } catch (error) {
        console.error('Error disconnecting from MongoDB', error)
        process.exit(1)
    }
}

module.exports = { connectToMongo, disconnectFromMongo }