/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../server/db')
const app = require('../../server/index')
const Product = db.model('product')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const productObj = {
        name: 'frog',
        price: 43.21
    }

    beforeEach(() => {
      return Product.create(productObj)
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(productObj.name)
          expect(Number(res.body[0].price)).to.be.equal(productObj.price)
        })
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
