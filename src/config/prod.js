// MongoDB env vars
const { USER, PASS, HOST, DB_PORT, DB } = process.env

export const config = {
  port: 3000,
  db: {
    url: `mongodb://${USER}:${PASS}@${HOST}:${DB_PORT}/${DB}`
  }
}
