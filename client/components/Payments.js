import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { postPayment } from '../store';

// can define total off the Payments class

class Payments extends Component {
  // setting equality as a prototypical property is not standard in JS specs yet (but prob will be)
  total = () => {
    const cart = this.props.cart;
    let sum = 0;
    Object.values(cart).forEach(product => {
      sum += +(product.price * product.quantity);
    });
    return sum * 100;
  };

  render () {
    const { handleToken } = this.props;

    return (
      <StripeCheckout
        name="Wizard Supply Shop"
        description="Thanks for coming by!"
        amount={this.total()}
        token={token => handleToken(token)}
        stripeKey="pk_test_tFYxJxufub7z64MriHlPVwy3"
        allowRememberMe={false}
        shippingAddress={true}
        billingAddress={true}
      >
        <button className="positive ui button">Checkout</button>
      </StripeCheckout>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleToken (token) {
      dispatch(postPayment(token));
    },
  };
}

const PaymentsContainer = connect(null, mapDispatchToProps)(Payments);

// const PaymentsContainer = connect(null, { postPayment })(Payments);


export default PaymentsContainer;
