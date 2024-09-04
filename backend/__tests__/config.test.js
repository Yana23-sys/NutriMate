const {config } = require('../config')

describe('config', () => {
    test('replacePlaceholders', () => {
        expect(config).toMatchObject({
            server: { host: 'localhost', port: '3000' },
            mongodb: { connectionUri: 'mongodb://localhost:27017/nutrimate' }
          })
    })
})