require('babel-polyfill')
import chai from 'chai'
const should = chai.should()
import app from '../src/server'
import request from 'supertest'

import { dropDb, seedDb } from './helpers'

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

  describe('GET /api/imagesearch/:searchTerm', () => {
    it('should respond with search results', async () => {
      await request(app)
        .get('/api/imagesearch/galaxy')
        .then(res => {
          res.type.should.equal('application/json')
          res.body.should.have.lengthOf(20)
          res.body[0].should.have.property('imageURL')
          res.body[0].should.have.property('tags')
          res.body[0].should.have.property('previewURL')
          res.body[0].should.have.property('pageURL')
        })
        .catch(err => {
          throw new Error(err)
        })
    })

    it('should respond with no search results', async () => {
      await request(app)
        .get('/api/imagesearch/_%20_')
        .then(res => {
          res.type.should.equal('application/json')
          res.body.should.have.lengthOf(0)
        })
        .catch(err => {
          throw new Error(err)
        })
    })
  })

  describe('GET /api/imagesearch/:searchTerm?offset=Number', () => {
    it('should respond with offset search results', async () => {
      await request(app)
        .get('/api/imagesearch/sun?offset=5')
        .then(res => {
          res.type.should.equal('application/json')
          res.body.should.have.lengthOf(5)
        })
        .catch(err => {
          throw new Error(err)
        })
    })
  })
})