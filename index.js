require('dotenv').config()
const express = require('express')
const axios = require('axios')
const mongodb = require('mongodb')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 8000
const KEY = process.env.KEY

// MongoDB env vars
const USER = process.env.USER
const PASS = process.env.PASS
const HOST = process.env.HOST
const DB_PORT = process.env.DB_PORT
const DB = process.env.DB

const uri = `mongodb://${USER}:${PASS}@${HOST}:${DB_PORT}/${DB}`
mongoose.connect(uri)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('we are connected to mlab DB!')
})

const termSchema = mongoose.Schema({
  term: String,
  when: String
})

const Term = mongoose.model('Term', termSchema)

// Save every search term
function saveSearchTerm (searchTerm) {
  const term = new Term({
    term: searchTerm,
    when: new Date().toISOString()
  })

  term.save(err => {
    if (err) return console.error(err)
  })
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
app.get('/api/imagesearch/:searchTerm', (req, res) => {
  const offSet = req.query.offset
  const searchTerm = req.params.searchTerm

  saveSearchTerm(searchTerm)

  const encodeSearchTerm = encodeURI(searchTerm)
  let imageReqUrl = `https://pixabay.com/api/?key=${ KEY }&q=${ encodeSearchTerm }&image_type=photo`

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
    .catch(error => {
      console.log(error)
      return
    })
})

// Recent 10 searches
app.get('/api/imagesearch/', (req, res) => {
  const query = Term.find().sort({'when': 'desc'}).limit(10)
  query.exec((err, terms) => {
    if (err) return console.error(err)

    const recentTerms = terms.map(recentTerm => {
      const { term, when } = recentTerm
      return {
        term,
        when
      }
    })

    res.json(recentTerms)
  })
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
