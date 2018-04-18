import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

/**
 * ACTION CREATORS
 */
const getAllProducts = allProducts => ({
  type: GET_ALL_PRODUCTS,
  allProducts,
});
const getSingleProduct = singleProduct => ({
  type: GET_SINGLE_PRODUCT,
  singleProduct,
});

/**
 * THUNK CREATORS
 */

export const fetchAllProducts = () => dispatch => {
  console.log('do i get here?????');
  return axios
    .get(`/api/products`)
    .then(res => {
      console.log('what is ress', res);
      dispatch(getAllProducts(res.data));
    })
    .catch(err => console.error(err));
};

export const fetchSingleProduct = productId => dispatch =>
  axios
    .get(`/api/products/${productId}`)
    .then(res => dispatch(getSingleProduct(res.data)))
    .catch(err => console.error(err));

/**
 * REDUCER
 */
export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts;

    case GET_SINGLE_PRODUCT:
      return action.singleProduct;

    default:
      return state;
  }
};
