import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { postToCart } from '../store';

const CartButton = props => {
  const { product, handleClick } = props;

  return (
    <Button onClick={evt => handleClick(product, evt)} inverted color="olive">
      Add to cart
    </Button>
  );
};

function mapDispatchToProps (dispatch) {
  return {
    handleClick (product, evt) {
      evt.preventDefault();
      dispatch(postToCart(product));
    }
  };
}

const CartButtonContainer = connect(null, mapDispatchToProps)(CartButton);

export default CartButtonContainer;
