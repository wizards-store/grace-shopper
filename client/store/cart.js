import axios from 'axios';
import history from '../history';

/*
 * ACTIONS
 */
const POST_PRODUCT_TO_CART = 'POST_PRODUCT_TO_CART';
const POST_CART = 'POST_CART';
const POST_SINGLE_PAYMENT = 'POST_SINGLE_PAYMENT';

/*
 * ACTION CREATORS
 */
const postProductToCart = singleProduct => ({ // currently unused
  type: POST_PRODUCT_TO_CART,
  singleProduct
});

const postCart = cart => ({
  type: POST_CART,
  cart
});

const postSinglePayment = emptyCart => ({
  type: POST_SINGLE_PAYMENT,
  emptyCart,
});

/*
 * THUNK CREATORS
 */
export function postToCart (product) {
  return function (dispatch) {
    return axios
      .post(`/api/cart`, product)
      .then(res => dispatch(postCart(res.data)))
      .catch(err => console.error(err));
  };
}

export function subtractQuantity (product) {
  return function (dispatch) {
    return axios
      .put(`/api/cart`, product)
      .then(res => dispatch(postCart(res.data)))
      .catch(err => console.error(err));
  };
}

export function getCart () {
  return function (dispatch) {
    return axios
      .get(`/api/cart`)
      .then(res => dispatch(postCart(res.data)))
      .catch(err => console.error(err));
  };
}

export function deleteProduct (product) {
  return function (dispatch) {
    return axios
      .delete(`/api/cart/${product.id}`)
      .then(res => dispatch(postCart(res.data)))
      .catch(err => console.error(err));
  };
}

export function postPayment (token) {
  console.log('what is token', token);
  return function (dispatch) {
    return axios
      .post(`/api/stripe`, token)
      .then(res => dispatch(postSinglePayment(res.data)))
      .then(() => history.push('/success'))
      .catch(err => console.error(err));
  };
}

/*
 * REDUCER
 */
export default function cartReducer (state = {}, action) {
  switch (action.type) {
    case POST_PRODUCT_TO_CART:
      return {
        ...state,
        [action.singleProduct.id]: action.singleProduct
      };

    case POST_CART:
      return action.cart;

    case POST_SINGLE_PAYMENT:
      return action.emptyCart;

    default:
      return state;
  }
}
