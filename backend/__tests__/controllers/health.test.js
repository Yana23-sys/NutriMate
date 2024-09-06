const request = require('supertest')
const express = require('express')
const healthRoutes = require('../../controllers/health')
const mongoose = require('mongoose')

// Create an instance of the Express app
const app = express()
app.use(express.json())

// Use the health routes in the app
app.use('/health', healthRoutes)

// Test the liveness route
describe('GET /health/liveness', () => {
    it('should return 200 OK', () => {
        return request(app)
            .get('/health/liveness')
            .expect(200)
            .then(response => {
                expect(response.body.status).toBe('OK')
            })
    })
})

// Test the readiness route
describe('GET /health/readiness', () => {
    it('should return 200 OK if the MongoDB connection is ready', async () => {
        const response = await request(app).get('/health/readiness')
        expect(response.status).toBe(200)
        expect(response.body.status).toBe('OK')
    })

    it('should return 503 Service Unavailable if the MongoDB connection is not ready', async () => {
        // Disconnect mongoose to simulate readiness failure
        await mongoose.disconnect()

        const response = await request(app).get('/health/readiness')
        expect(response.status).toBe(503)
        expect(response.body.status).toBe('Not Ready')

        // Reconnect mongoose to restore test state
        await mongoose.connect(global.__MONGO_URI__)
    })
})
