/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AllProducts } from '../../client/components';
import { Provider } from 'react-redux';
import store from '../../client/store';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('AllProducts', () => {
  let allProducts;

  beforeEach(() => {
    allProducts = shallow(
      // <Provider store={store}>
      <AllProducts store={store} allProducts={[{ name: 'Nimbus 2000' }]} />
      // </Provider>
    );
  });

  it('renders the product in an h3', () => {
    console.log('????????', allProducts.find('h3'));
    expect(allProducts.find('h3').text()).to.be.equal('Nimbus 2000');
  });
});
