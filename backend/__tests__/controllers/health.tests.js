const request = require('supertest')
const express = require('express')
const healthRoutes = require('../../controllers/health')

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
                console.log(response.body)

                expect(response.body.status).toBe('OK')
            })
    })
})

// Test the readiness route
describe('GET /health/readiness', () => {})
