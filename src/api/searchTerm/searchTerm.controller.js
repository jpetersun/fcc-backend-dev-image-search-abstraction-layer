require('dotenv').config()
const axios = require('axios')
const boom = require('boom')

const SearchTerm = require('./searchTerm.model')
// Save every search term
function saveSearchTerm (searchTerm) {
  return SearchTerm.create({searchTerm})
}

// Search for images using the pixabay api
// function getSearchTerm (req, res, next) {
exports.getSearchTerm = function (req, res, next) {
  const offSet = req.query.offset
  const searchTerm = req.params.searchTerm

  saveSearchTerm(searchTerm)
    .catch(err => {
      console.error(err)
    })

  const KEY = process.env.KEY
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
}
// app.get('/api/imagesearch/:searchTerm', (req, res, next) => {

// })

// Recent 10 search terms
// function getRecentTerms (req, res, next) {
exports.getRecentTerms = function (req, res, next) {
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
}

// app.get('/api/imagesearch/', (req, res, next) => {

// })