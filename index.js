const express = require('express')

const app = express()
const PORT = process.env.PORT || 8000

app.get('/api/imagesearch/:searchTerm:offset', (req, res) => {
  res.send(req.params)
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
