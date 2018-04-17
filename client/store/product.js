import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

/**
 * ACTION CREATORS
 */
const getAllProducts = allProducts => ({ type: GET_ALL_PRODUCTS, allProducts });

/**
 * THUNK CREATORS
 */

export const products = () => dispatch =>
  axios
    .get(`/api/products`)
    .then(res => dispatch(getAllProducts(res.data)))
    .catch(err => console.error(err));

/**
 * REDUCER
 */
export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts;

    default:
      return state;
  }
};
