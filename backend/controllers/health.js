const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const liveness = (req, res) => {
    res.status(200).send({ status: 'OK' })
}

const readiness = (req, res) => {
    const state = mongoose.connection.readyState

    if (state === 1) {
        // 1 means connected
        res.status(200).json({ status: 'OK' })
    } else {
        res.status(503).json({ status: 'Not Ready' })
    }
}

// Liveness route
router.get('/liveness', liveness)

// Readiness route
router.get('/readiness', readiness)

module.exports = router
