import express from 'express'
import restRouter from './api'
import connect from './db'

const app = express()
connect()

app.use('/api', restRouter)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

export default app
