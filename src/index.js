const app = require('./server')
const { port } = require('./config')

app.listen(port, () => console.log(`Listening on port: ${port}\n`))
