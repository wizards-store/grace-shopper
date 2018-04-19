import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { postProduct } from '../store';

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

function mapDispatchToProps(dispatch) {
  // const product = this.props;
  // console.log('what is product', product);

  return {
    handleSubmit(product, evt) {
      evt.preventDefault();
      console.log('its working', product);
      dispatch(postProduct(product));
    },
  };
}

const CartFormContainer = connect(null, mapDispatchToProps)(CartForm);

export default CartFormContainer;
