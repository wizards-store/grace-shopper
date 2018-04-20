import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
// import stripePublishableKey from '.../secrets';

class Payments extends Component {
  total = () => {
    const cart = this.props.cart;
    let sum = 0;
    Object.values(cart).forEach(product => {
      sum += +(product.price * product.quantity);
    });
    return sum * 100;
  };

  render () {
    return (
      <StripeCheckout
        name="Wizard Supply Shop"
        description="Thanks for coming by!"
        amount={this.total()} // this should be dynamic based on amount in cart - this is in cents -> 5 dollar here
        token={token => console.log(token)}
        stripeKey="pk_test_tFYxJxufub7z64MriHlPVwy3"
      >
        <button className="positive ui button">Checkout</button>
      </StripeCheckout>
    );
  }
}

export default Payments;
