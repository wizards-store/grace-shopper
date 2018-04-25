/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';
import { AllProducts } from '../../client/components';
import store from '../../client/store';

const adapter = new Adapter();
enzyme.configure({ adapter });

spy(AllProducts.prototype, 'componentDidMount');

describe('<AllProducts />', () => {
  let allProducts;

  beforeEach(() => {
    allProducts = shallow(<AllProducts store={store} />);
  });

  it('calls componentDidMount', () => {
    expect(AllProducts.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('should render', () => {
    expect(allProducts.hasClass('all-products'));
  });
});
