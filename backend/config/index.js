const fs = require('fs')
const yaml = require('js-yaml')
const dotenv = require('dotenv')

const ENV = process.env.NODE_ENV

// Load environment variables from .env file
dotenv.config()

// Read and parse the YAML configuration file
const fileContents = fs.readFileSync(`./config/config${ENV ? '-' + ENV : ''}.yaml`, 'utf8')
const config = yaml.load(fileContents)

// Replace placeholders in the config with environment variables
const replacePlaceholders = (obj) => {
    const envVarCapturingRegex = /\${(.*?)}/g

    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            // Replace placeholders with corresponding environment variables or default values
            obj[key] = obj[key].replace(envVarCapturingRegex, (match, envVarWithDefault) => {
                const [envVarName, defaultValue] = envVarWithDefault.split(':');
                return process.env[envVarName] || defaultValue || match;
                // match means entire string '${MONGODB_USER}' so if env variable does not exist or there is no default value -> leaves everything as is
            });
          } else if (typeof obj[key] === 'object') {
            replacePlaceholders(obj[key])
        }
    }
}

replacePlaceholders(config)

module.exports = {config}