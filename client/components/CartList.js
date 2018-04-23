import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import Payments from './Payments';
import { getCart, deleteProduct, postCart, subtractQuantity } from '../store';

class CartList extends Component {
  componentDidMount () {
    this.props.getCart();
  }

  render () {
    const { cart, handleClick, handleAddClick, handleSubtractClick } = this.props;

    return (
      <div>
        {Object.keys(cart).length ? (
          <div>
            {Object.keys(cart).map(key => {
              let product = cart[key];
              return (
                <div key={product.id}>
                  <Card>
                    <Image src={product.photo} />
                    <Card.Content>
                      <button
                        onClick={() => handleClick(product)}
                        className="negative mini ui right floated button"
                      >
                        X
                      </button>
                      <Card.Header>{product.name}</Card.Header>
                      <Card.Meta>{product.createdAt}</Card.Meta>
                      <Card.Description>
                        {product.description}
                      </Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                      <a>
                        <Icon name="user" />
                        {product.quantity}
                      </a>
                      <hr />
                      <Button
                        onClick={() => handleSubtractClick(product)}
                        color="red"
                      >
                        -
                      </Button>
                      <Button
                        onClick={() => handleAddClick(product)}
                        color="teal"
                      >
                        +
                      </Button>
                      <hr />
                      <a>
                        <Icon name="user" />
                        {product.price * product.quantity}
                      </a>
                    </Card.Content>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <p>There is currently nothing in cart.</p>
        )}
        <Payments cart={cart} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    cart: state.cart
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getCart: () => dispatch(getCart()),
    // don't need "handleClick" for every dispatch function - can be named anything you want more descriptive
    handleClick (product) {
      dispatch(deleteProduct(product));
    },
    handleAddClick (product) {
      dispatch(postCart(product));
    },
    handleSubtractClick (product) {
      dispatch(subtractQuantity(product));
    },
  };
}

const mapDispatchToProps = {
  getCart,
  deleteProduct,
  postCart,
  subtractQuantity
}

const CartListContainer = connect(mapStateToProps, mapDispatchToProps)(
  CartList
);

// const CartListContainer = connect(
//   mapStateToProps,
//   {
//   getCart,
//   deleteProduct,
//   postCart,
//   subtractQuantity
//   }
//)(CartList);

export default CartListContainer;
