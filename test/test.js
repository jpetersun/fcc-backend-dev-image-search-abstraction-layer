const chai = require('chai')
const should = chai.should()
const app = require('../index').app
const request = require('supertest')

const { dropDb, seedDb } = require('./helpers')

describe('search terms api', () => {
  beforeEach(async () => {
    await dropDb()
    await seedDb()
  })

  it('should respond with 3 search terms', done => {
    request(app)
      .get('/api/imagesearch')
      .then(res => {
        res.type.should.equal('application/json')
        console.log(res.body)
        done()
      })
  })
})