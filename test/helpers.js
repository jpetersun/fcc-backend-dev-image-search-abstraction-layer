const mongoose = require('mongoose')
const config = require('../src/config')
const SearchTerm = require('../src/api/searchTerm/searchTerm.model')
mongoose.Promise = global.Promise

function saveSearchTerm (searchTerm) {
  return SearchTerm.create({searchTerm})
}

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
  return mongoose.connect(config.db.url)
   .then(() => Promise.all(mongoose.modelNames().map(removeModel)))
}

function seedDb (terms) {
  return mongoose.connect(config.db.url)
    .then(() => Promise.all(terms.map(term => {
      return saveSearchTerm(term)
    })))
}

module.exports = {
  dropDb,
  seedDb
}
