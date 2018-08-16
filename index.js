require('dotenv').config()
const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const boom = require('boom')

const app = express()

app.use(express.static('public'))

const PORT = process.env.PORT || 8000
const KEY = process.env.KEY

// MongoDB env vars
const USER = process.env.USER
const PASS = process.env.PASS
const HOST = process.env.HOST
const DB_PORT = process.env.DB_PORT
const DB = process.env.DB

let uri = null

if (process.env.NODE_ENV === 'development') {
  uri = 'mongodb://localhost:27017/fcc-image-search'
} else {
  uri = `mongodb://${USER}:${PASS}@${HOST}:${DB_PORT}/${DB}`
}

mongoose.connect(uri)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

const SearchTerm = require('./searchTerm.model')

// Save every search term
function saveSearchTerm (searchTerm) {
  return SearchTerm.create({searchTerm})
}

const fs = require('fs')
const _template = require('lodash.template')
const body = fs.readFileSync('index-md.html', 'utf8')
const baseTemplate = fs.readFileSync('./index.html')
const template = _template(baseTemplate)

app.get('/', (req, res) => {
  res.write(template({ body }))
  res.end()
})

// Search for images using the pixabay api
app.get('/api/imagesearch/:searchTerm', (req, res, next) => {
  const offSet = req.query.offset
  const searchTerm = req.params.searchTerm

  saveSearchTerm(searchTerm)
    .catch(err => {
      return next(boom.badRequest(err))
    })

  const encodedSearchTerm = encodeURI(searchTerm)
  let imageReqUrl = `https://pixabay.com/api/?key=${ KEY }&q=${ encodedSearchTerm }&image_type=photo`

  if (offSet) {
    imageReqUrl += `&per_page=${ offSet }`
  }

  axios.get(imageReqUrl)
    .then(response => {
      const data = response.data
      const images = data.hits.map(image => {
        const { imageURL, tags, previewURL, pageURL } = image
        return {
          imageURL,
          tags,
          previewURL,
          pageURL
        }
      })

      res.json(images)
    })
    .catch(err => {
      return next(boom.badRequest(err))
    })
})

// Recent 10 search terms
app.get('/api/imagesearch/', (req, res, next) => {
  const query = SearchTerm.find().sort({'createdAt': 'desc'}).limit(10)
  query.exec((err, terms) => {
    if (err) {
      return next(boom.badRequest(err))
    }

    const recentTerms = terms.map(recentTerm => {
      const { searchTerm, createdAt } = recentTerm
      const when = createdAt
      return {
        searchTerm,
        when
      }
    })

    res.json(recentTerms)
  })
})

// error handler middleware using boom
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }

  return res.status(err.output.statusCode).json(err.output.payload)
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}\n`))

module.exports = {
  app,
  saveSearchTerm,
  SearchTerm,
}
