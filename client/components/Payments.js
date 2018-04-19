import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
// import stripePublishableKey from '.../secrets';

class Payments extends Component {
  total = () => {
    const cart = this.props.cart;
    let sum = 0;
    Object.values(cart).forEach(product => {
      sum += +product.price;
    });
    return sum * 100;
  };

  render () {
    return (
      <StripeCheckout
        amount={this.total()} // this should be dynamic based on amount in cart - this is in cents -> 5 dollar here
        token={token => console.log(token)}
        stripeKey="pk_test_tFYxJxufub7z64MriHlPVwy3"
      />
    );
  }
}

export default Payments;
