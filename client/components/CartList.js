import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import Payments from './Payments';
import { getCart, deleteProduct, postToCart, subtractQuantity, fetchAllProducts } from '../store';

class CartList extends Component {
  componentDidMount () {
    this.props.fetchAllProducts();
    this.props.getCart();
  }

  render () {
    const {
      cart,
      products,
      user,
      handleClick,
      handleAddClick,
      handleSubtractClick,
    } = this.props;
    return (
      <div>
        {Object.keys(products).length ? (
          <div>
            {Object.keys(cart).map(itemId => {
              let product = products[itemId];
              return (
                <div key={itemId}>
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
                      <Card.Description>{product.description}</Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                      <a>
                        <Icon name="user" />
                        {user.id ? cart[itemId] : cart[itemId].quantity}
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
                        {user.id
                          ? product.price * cart[itemId]
                          : product.price * cart[itemId].quantity}
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
    cart: state.cart,
    products: state.products,
    user: state.user,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getCart: () => dispatch(getCart()),
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    // don't need "handleClick" for every dispatch function - can be named anything you want more descriptive
    handleClick (product) {
      dispatch(deleteProduct(product));
    },
    handleAddClick (product) {
      dispatch(postToCart(product));
    },
    handleSubtractClick (product) {
      dispatch(subtractQuantity(product));
    }
  };
}

const CartListContainer = connect(mapStateToProps, mapDispatchToProps)(
  CartList
);

export default CartListContainer;
