const {config } = require('../config')

describe('config', () => {
    test('replacePlaceholders', () => {
        console.log(`Server running at ${config.server.host}:${config.server.port}`);
        console.log(config);
        expect(config).toMatchObject({
            server: { host: 'localhost', port: '3000' },
            mongodb: { connectionUri: 'mongodb://localhost:27017/nutrimate' }
          })
    })
})