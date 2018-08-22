const express = require('express')
const restRouter = require('./api')
const connect = require('./db')
const app = express()
connect()
app.use('/api', restRouter)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

export default app
