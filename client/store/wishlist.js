import axios from 'axios';
import history from '../history';

/*
 * ACTIONS
 */
const POST_WISHLIST = 'POST_WISHLIST';

/*
 * ACTION CREATORS
 */
const postWishlist = wishlist => ({
  type: POST_WISHLIST,
  wishlist
});

/*
 * THUNK CREATORS
 */
export function postToWishlist (product) {
  return function (dispatch) {
    return axios
      .post(`/api/wishlist`, product)
      .then(res => dispatch(postWishlist(res.data)))
      .catch(err => console.error(err));
  };
}

export function getWishlist () {
  return function (dispatch) {
    return axios
      .get(`/api/wishlist`)
      .then(res => dispatch(postWishlist(res.data)))
      .catch(err => console.error(err));
  };
}

export function deleteWishlistProduct (product) {
  return function (dispatch) {
    return axios
      .delete(`/api/wishlist/${product.id}`)
      .then(res => {
        dispatch(postWishlist(res.data));
      })
      .catch(err => console.error(err));
  };
}

/*
 * REDUCER
 */
export default function cartReducer (state = {}, action) {
  switch (action.type) {
    case POST_WISHLIST:
      return action.wishlist;
    default:
      return state;
  }
}
