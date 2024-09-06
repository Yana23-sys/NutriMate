const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    global.__MONGO_URI__ = mongoUri
    await mongoose.connect(mongoUri)
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})
