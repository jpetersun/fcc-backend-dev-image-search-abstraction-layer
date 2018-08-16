const mongoose = require('mongoose')

const searchTermSchema = new mongoose.Schema({
  searchTerm: {
    type: String,
    require: true
  },
}, {timestamps: true})

const SearchTerm = mongoose.model('SearchTerm', searchTermSchema)

module.exports = SearchTerm
