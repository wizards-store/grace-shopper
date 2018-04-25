/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProductCard } from '../../client/components/ProductCard';
import { Provider } from 'react-redux';
import store from '../../client/store';
import { Card } from 'semantic-ui-react';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe.only('ProductCard', () => {
  let productCard;

  beforeEach(() => {
    productCard = shallow(
      <ProductCard store={store} product={{ name: 'Nimbus 2000' }} />
    );
  });

  it('renders the product name in an Card.Header tag', () => {
    console.log('????????', productCard.find('Card.Header'));
    expect(productCard.find('Card.Header').text()).to.be.equal('Nimbus 2000');
  });


});
