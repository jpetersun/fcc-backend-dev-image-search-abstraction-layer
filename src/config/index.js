const merge = require('lodash.merge')

const NODE_ENV = process.env.NODE_ENV

const baseConfig = {
  port: 8000,
  db: {
    url: 'mongodb://localhost:27017/fcc-image-search'
  }
}

let envConfig = {}

switch (NODE_ENV) {
  case 'development':
  case 'dev':
    envConfig = require('./dev')
    break;
  case 'test':
  case 'testing':
    envConfig = require('./testing')
    break;
  case 'prod':
  case 'production':
    envConfig = require('./prod')
  default:
    envConfig = require('./dev')
}

module.exports = merge(baseConfig, envConfig)
