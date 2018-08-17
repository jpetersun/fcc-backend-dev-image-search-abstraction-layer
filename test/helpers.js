const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/test-fcc-image-search'
const { saveSearchTerm } = require('../index')
mongoose.Promise = global.Promise

function removeModel (modelName) {
  const model = mongoose.model(modelName)
  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve()
    }

    model.remove(err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function dropDb () {
  return mongoose.connect(uri)
   .then(() => Promise.all(mongoose.modelNames().map(removeModel)))
}

function seedDb (terms) {
  return mongoose.connect(uri)
    .then(() => Promise.all(terms.map(term => {
      return saveSearchTerm(term)
    })))
}

module.exports = {
  dropDb,
  seedDb
}
