/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { postToWishlist, getWishlist } from '../../client/store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = { wishlist: {} };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('postToWishlist', () => {
    it('eventually dispatches the POST_WISHLIST action', () => {
      const fakeWishlist = { 1: { name: 'Wand' } };
      mockAxios.onPost('/api/wishlist').replyOnce(201, fakeWishlist);
      return store.dispatch(postToWishlist()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal('POST_WISHLIST');
        expect(actions[0].wishlist).to.be.deep.equal(fakeWishlist);
      });
    });
  });

  describe('getWishlist', () => {
    it('eventually dispatches the POST_WISHLIST action', () => {
      const fakeWishlist = { 1: { name: 'Wand' } };
      mockAxios.onGet('/api/wishlist').replyOnce(200, fakeWishlist);
      return store.dispatch(getWishlist()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal('POST_WISHLIST');
        expect(actions[0].wishlist).to.be.deep.equal(fakeWishlist);
      });
    });
  });
});
