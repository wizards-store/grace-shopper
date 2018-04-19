import axios from 'axios';
import history from '../history';

const POST_SINGLE_CART = 'POST_SINGLE_CART';
const GET_SINGLE_CART = 'GET_SINGLE_CART';

const postSingleCart = singleProduct => ({
  type: POST_SINGLE_CART,
  singleProduct,
});

const getSingleCart = singleCart => ({
  type: GET_SINGLE_CART,
  singleCart,
});

export function postCart (product) {
  return function (dispatch) {
    return axios
      .post(`/api/cart`, product)
      .then(res => dispatch(postSingleCart(res.data)))
      .catch(err => console.error(err));
  };
}

export function getCart () {
  return function (dispatch) {
    return axios
      .get(`/api/cart`)
      .then(res => dispatch(getSingleCart(res.data)))
      .catch(err => console.error(err));
  };
}

export default function cartReducer (state = {}, action) {
  switch (action.type) {
    case POST_SINGLE_CART:
      return {
        ...state,
        [action.singleProduct.id]: action.singleProduct,
      };

    case GET_SINGLE_CART:
      return action.singleCart;

    default:
      return state;
  }
}
