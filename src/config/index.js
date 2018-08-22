import dotenv from 'dotenv'
// load env vars
dotenv.config()

import merge from 'lodash.merge'

const baseConfig = {
  port: 8000
}

let envConfig = {}

const NODE_ENV = process.env.NODE_ENV
switch (NODE_ENV) {
  case 'development':
  case 'dev':
    envConfig = require('./dev').config
    break
  case 'test':
  case 'testing':
    envConfig = require('./testing').config
    break
  case 'prod':
  case 'production':
    envConfig = require('./prod').config
    break
  default:
    envConfig = require('./dev').config
}

export default merge(baseConfig, envConfig)
