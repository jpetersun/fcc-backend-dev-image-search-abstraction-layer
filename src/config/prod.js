// MongoDB env vars
const USER = process.env.USER
const PASS = process.env.PASS
const HOST = process.env.HOST
const DB_PORT = process.env.DB_PORT
const DB = process.env.DB

module.exports = {
  port: 3000,
  db: {
    url: `mongodb://${USER}:${PASS}@${HOST}:${DB_PORT}/${DB}`
  }
}
