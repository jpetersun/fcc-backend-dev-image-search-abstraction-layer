const express = require('express')

const app = express()
const PORT = process.env.PORT || 8000

app.get('/api/imagesearch/:searchTerm', (req, res) => {
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
    offset: req.query.offset,
    searchTerm: req.params.searchTerm
  })
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
