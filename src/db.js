const mongoose = require('mongoose')
const appConfig = require('./config')
mongoose.Promise = global.Promise

function connect () {
  return mongoose.connect(appConfig.db.url)
}

module.exports = connect
