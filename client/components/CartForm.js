import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { postToCart } from '../store';

const CartForm = props => {
  const { product, handleSubmit } = props;

  return (
    <Form onSubmit={evt => handleSubmit(product, evt)}>
      <Button inverted color="olive" type="submit">
        Add to cart
      </Button>
    </Form>
  );
};

function mapDispatchToProps (dispatch) {
  return {
    handleSubmit (product, evt) {
      evt.preventDefault();
      dispatch(postToCart(product));
    }
  };
}

const CartFormContainer = connect(null, mapDispatchToProps)(CartForm);

export default CartFormContainer;
