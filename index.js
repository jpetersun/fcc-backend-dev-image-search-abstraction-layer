require('dotenv').config()
const express = require('express')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 8000
const KEY = process.env.KEY || 123

app.get('/api/imagesearch/:searchTerm', (req, res) => {
  const offSet = req.query.offset
  const searchTerm = encodeURI(req.params.searchTerm)

  let imageReqUrl = `https://pixabay.com/api/?key=${ KEY }&q=${ searchTerm }&image_type=photo`

  if (searchTerm) {
    imageReqUrl += `&per_page=${ offSet }`
  }

  let url = null
  let snippet = null
  let thumbnail = null
  let context = null

  const searchResult = {
    url,
    snippet,
    thumbnail,
    context
  }

  res.send({
    offSet,
    searchTerm,
    imageReqUrl
  })
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
