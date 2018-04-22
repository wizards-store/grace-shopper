import axios from 'axios';
import history from '../history';

const POST_SINGLE_PAYMENT = 'POST_SINGLE_PAYMENT';

const postSinglePayment = singlePayment => ({
  type: POST_SINGLE_PAYMENT,
  singlePayment,
});

export function postPayment (token) {
  console.log('does it get here???');
  console.log('what is token', token);
  return function (dispatch) {
    return axios
      .post(`/api/stripe`, token)
      .then(res => dispatch(postSinglePayment(res.data)))
      .catch(err => console.error(err));
  };
}

export default function paymentReducer (state = {}, action) {
  switch (action.type) {
    case POST_SINGLE_PAYMENT:
      return {
        ...state,
        [action.singlePayment.id]: action.singlePayment,
      };

    default:
      return state;
  }
}
