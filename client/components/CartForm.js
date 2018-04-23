import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { postCart } from '../store';


// const CartForm = ({ product, handleSubmit }) => {...}
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

// consider making this component 100% dumb, and presentational only, and passing this dispatch in through props from the component that rendered it
function mapDispatchToProps (dispatch) {
  return {
    handleSubmit (product, evt) {
      evt.preventDefault();
      dispatch(postCart(product));
    },
  };
}

const CartFormContainer = connect(null, mapDispatchToProps)(CartForm);

export default CartFormContainer;
