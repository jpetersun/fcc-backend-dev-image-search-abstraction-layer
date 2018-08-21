require('dotenv').config()
const merge = require('lodash.merge')

const baseConfig = {
  port: 8000
}

let envConfig = {}

const NODE_ENV = process.env.NODE_ENV
switch (NODE_ENV) {
  case 'development':
  case 'dev':
    envConfig = require('./dev')
    break
  case 'test':
  case 'testing':
    envConfig = require('./testing')
    break
  case 'prod':
  case 'production':
    envConfig = require('./prod')
    break
  default:
    envConfig = require('./dev')
}

module.exports = merge(baseConfig, envConfig)
