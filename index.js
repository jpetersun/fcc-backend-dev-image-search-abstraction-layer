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

  if (offSet) {
    imageReqUrl += `&per_page=${ offSet }`
  }

  let data = null
  let images = null
  axios.get(imageReqUrl)
    .then(response => {
      data = response.data
      images = data.hits.map(image => {
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

app.get('/api/imagesearch/', (req, res) => {

  res.json({

  })
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
