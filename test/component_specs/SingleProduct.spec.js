import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SingleProduct } from '../../client/components';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('SingleProduct', () => {
  let singleProduct;
  const fakeProduct = {
    name: 'Firebolt',
    price: 400,
    description: `Harry's second broom`,
    inventory: 1,
    photo:
      'https://vignette.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg/revision/latest?cb=20150530185551'
  };

  beforeEach(() => {
    singleProduct = shallow(<SingleProduct product={fakeProduct} />);
  });

  it('renders the product description', () => {
    expect(singleProduct.find('p').text()).to.equal(`Harry's second broom`);
  });
});
