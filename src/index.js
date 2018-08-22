// const app = require('./server')
import app from './server'
const { port } = require('./config')

app.listen(port, () => console.log(`Listening on port: ${port}\n`))
