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
  return axios
    .get(`/api/products`)
    .then(res => {
      dispatch(getAllProducts(res.data));
    })
    .catch(err => console.error(err));
};

export function fetchSingleProduct(productId) {
  return function(dispatch) {
    return axios
      .get(`/api/products/${productId}`)
      .then(res => dispatch(getSingleProduct(res.data)))
      .catch(err => console.error(err));
      // OB/JS: nice! improvement: report error to user somehow, low hanging fruit "toast notification", e.g. react-toastr: https://github.com/tomchentw/react-toastr
  };
}

/**
 * REDUCER
 */
export function allProductsReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts;
    default:
      return state;
  }
}

// OB/JS: consider simplifying to just having all products on state

export function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.singleProduct;

    default:
      return state;
  }
}
