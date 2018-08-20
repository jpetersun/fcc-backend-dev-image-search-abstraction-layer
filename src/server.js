const express = require('express')
const boom = require('boom')
const restRouter = require('./api')
const connect = require('./db')
const app = express()
connect()
app.use('/api', restRouter)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

module.exports = app
