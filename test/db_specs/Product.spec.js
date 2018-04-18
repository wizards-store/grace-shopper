/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../server/db')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Product model', () => {
      let frog

      beforeEach(() => {
        return Product.create({
            name: 'frog',
            price: 599.99
        })
          .then(product => {
            // console.log(product.dataValues)
            frog = product
          })
      })

      // OB/JS: don't need `frog.dataValues.name` can just do `frog.name`
      it('expects name to be string', () => {
        expect(frog.dataValues.name).to.be.a('string')
      })

      it('returns true if the price is Number', () => {
        expect(Number(frog.dataValues.price)).to.be.a('number')
      })
  }) // end describe('instanceMethods')
}) // end describe('Product model')
