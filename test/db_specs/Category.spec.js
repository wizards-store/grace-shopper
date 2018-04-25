/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../../server/db');
const Category = db.model('category');

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('Category', () => {
      let category;

      beforeEach(() => {
        return Category.create({
        })
          .then(createdCategory => {
            // console.log(product.dataValues)
            category = createdCategory;
          });
      });

      it('expect name to be a String', () => {
        expect(category.dataValues.name).to.be.a('string');
      });

  }); // end describe('instanceMethods')
}); // end describe('Product model')
