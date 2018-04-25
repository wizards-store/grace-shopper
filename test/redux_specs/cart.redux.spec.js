/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { getCart } from '../../client/store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
// import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = { cart: {} };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('cart', () => {
    it('fetches cart', () => {
      const fakeCart = { name: 'firebolt', price: 700 };
      mockAxios.onGet('/api/carts').replyOnce(200, fakeCart);
      return store.dispatch(getCart()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal('POST_CART');
        expect(actions[0].cart).to.be.deep.equal(fakeCart);
      });
    });
  });
});
