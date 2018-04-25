import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { postPayment } from '../store';
import secretApiKey from '../../secrets.js';
const apiKey =
  process.env.NODE_ENV === 'production'
    ? process.env.SECRET_API_KEY
    : secretApiKey;

class Payments extends Component {
  total () {
    // const cart = this.props.cart;
    const { cart, products, user } = this.props;
    let sum = 0;

    if (user.id) {
      Object.keys(cart).forEach(itemKey => {
        sum += +(products[itemKey].price * cart[itemKey]);
      });
      return sum * 100;
    } else {
      Object.values(cart).forEach(product => {
        sum += +(product.price * product.quantity);
      });
      return sum * 100;
    }
  }

  render () {
    const { handleToken } = this.props;
    return (
      <StripeCheckout
        name="Wizard Supply Shop"
        description="Thanks for coming by!"
        amount={this.total()}
        token={token => handleToken(token)}
        stripeKey={apiKey}
        allowRememberMe={false}
        shippingAddress={true}
        billingAddress={true}
      >
        <button className="positive ui button">Checkout</button>
      </StripeCheckout>
    );
  }
}

function mapStateToProps (state) {
  return {
    cart: state.cart,
    products: state.products,
    user: state.user
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleToken (token) {
      dispatch(postPayment(token));
    }
  };
}

const PaymentsContainer = connect(mapStateToProps, mapDispatchToProps)(
  Payments
);

export default PaymentsContainer;
