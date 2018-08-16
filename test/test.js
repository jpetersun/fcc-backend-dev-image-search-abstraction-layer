const chai = require('chai')
const should = chai.should()
const app = require('../index').app
const request = require('supertest')

const { dropDb, seedDb } = require('./helpers')

describe('Image Search API', () => {
  const terms = ['computers', 'music', 'stars']
  beforeEach(async () => {
    await dropDb()
    await seedDb(terms)
  })

  afterEach(async () => {
    await dropDb()
  })

  describe('GET /api/imagesearch', () => {
    // no need to use `done` with async
    it('should respond with 3 search terms', async () => {
      await request(app)
        .get('/api/imagesearch')
        .then(res => {
          res.type.should.equal('application/json')
          res.body.should.have.lengthOf(3)
        })
        .catch(err => {
          throw new Error(err)
        })
    })

    it('should respond with 10 search terms', async () => {
      // seedDb a few more times
      await seedDb(terms)
      await seedDb(terms)
      await seedDb(terms)

      await request(app)
        .get('/api/imagesearch')
        .then(res => {
          res.type.should.equal('application/json')
          res.body.should.have.lengthOf(10)
        })
        .catch(err => {
          throw new Error(err)
        })
    })
  })
})