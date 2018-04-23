import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { postCart } from '../store';

const CartForm = props => {
  const { product, handleSubmit, user } = props;
  {
    console.log('what is this.props?', props);
  }

  return (
    <Form onSubmit={evt => handleSubmit(product, evt)}>
      <Button inverted color="olive" type="submit">
        Add to cart
      </Button>
    </Form>
  );
};

function mapStateToProps (state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleSubmit (product, evt) {
      evt.preventDefault();
      dispatch(postCart(product));
    },
  };
}

const CartFormContainer = connect(mapStateToProps, mapDispatchToProps)(
  CartForm
);

export default CartFormContainer;
