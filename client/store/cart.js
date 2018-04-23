import axios from 'axios';
import history from '../history';

const POST_SINGLE_CART = 'POST_SINGLE_CART';
const GET_SINGLE_CART = 'GET_SINGLE_CART';
const DELETE_SINGLE_PRODUCT = 'DELETE_SINGLE_PRODUCT';
const SUBTRACT_SINGLE_QUANTITY = 'SUBTRACT_SINGLE_QUANTITY';
const POST_SINGLE_PAYMENT = 'POST_SINGLE_PAYMENT';

const postSingleCart = singleProduct => ({
  type: POST_SINGLE_CART,
  singleProduct,
});

const getSingleCart = singleCart => ({
  type: GET_SINGLE_CART,
  singleCart,
});

const deleteSingleProduct = singleCart => ({
  type: DELETE_SINGLE_PRODUCT,
  singleCart,
});

const subtractSingleQuantity = singleCart => ({
  type: SUBTRACT_SINGLE_QUANTITY,
  singleCart,
});

const postSinglePayment = () => ({
  type: POST_SINGLE_PAYMENT
});

export function postCart (product) {
  return function (dispatch) {
    return axios
      .post(`/api/cart`, product)
      .then(res => dispatch(postSingleCart(res.data)))
      .catch(err => console.error(err));
  };
}

export function subtractQuantity (product) {
  return function (dispatch) {
    return axios
      .post(`/api/cart/subtract`, product)
      .then(res => dispatch(subtractSingleQuantity(res.data)))
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

export function deleteProduct (product) {
  return function (dispatch) {
    return axios
      .delete(`/api/cart/${product.id}`)
      .then(res => dispatch(deleteSingleProduct(res.data)))
      .catch(err => console.error(err));
  };
}

export function postPayment (token) {
  return function (dispatch) {
    return axios
      .post(`/api/stripe`, token)
      .then(res => dispatch(postSinglePayment()))
      .then(() => history.push('/success'))
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

    case SUBTRACT_SINGLE_QUANTITY:
      return action.singleCart;

    case GET_SINGLE_CART:
      return action.singleCart;

    case DELETE_SINGLE_PRODUCT:
      return action.singleCart;

    case POST_SINGLE_PAYMENT:
      return {};

    default:
      return state;
  }
}
