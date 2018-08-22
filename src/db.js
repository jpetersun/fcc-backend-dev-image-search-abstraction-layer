import mongoose from 'mongoose'
import config from './config'
mongoose.Promise = global.Promise

function connect () {
  return mongoose.connect(config.db.url)
}

export default connect
