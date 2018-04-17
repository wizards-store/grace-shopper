/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { products } from '../../client/store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
// import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe.only('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = { allProducts: [] };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('products', () => {
    it('fetches all products', () => {
      const fakeProduct = [{ name: 'Nimbus 2000' }];
      mockAxios.onGet('/api/products').replyOnce(200, fakeProduct);
      return store.dispatch(products()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS');
        expect(actions[0].allProducts).to.be.deep.equal(fakeProduct);
      });
    });
  });
});
