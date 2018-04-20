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
    const { handleClick, handleAddClick, handleSubtractClick } = this.props;
    let cart = this.props.cart;

    return (
      <div>
        {Object.keys(cart).length ? (
          <div>
            {Object.keys(cart).map(key => {
              return (
                <div key={cart[key].id}>
                  <Card>
                    <Image src={cart[key].photo} />
                    <Card.Content>
                      <Button
                        onClick={() => handleClick(cart[key])}
                        className="negative mini ui right floated button"
                      >
                        X
                      </Button>
                      <Card.Header>{cart[key].name}</Card.Header>
                      <Card.Meta>{cart[key].createdAt}</Card.Meta>
                      <Card.Description>
                        {cart[key].description}
                      </Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                      <a>
                        <Icon name="user" />
                        {cart[key].quantity}
                      </a>
                      <hr />
                      <Button
                        onClick={() => handleSubtractClick(cart[key])}
                        color="red"
                      >
                        -
                      </Button>
                      <Button
                        onClick={() => handleAddClick(cart[key])}
                        color="teal"
                      >
                        +
                      </Button>
                      <hr />
                      <a>
                        <Icon name="user" />
                        {cart[key].price * cart[key].quantity}
                      </a>
                    </Card.Content>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : null}
        <Payments cart={this.props.cart} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    cart: state.cart,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getCart: () => dispatch(getCart()),
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

const CartListContainer = connect(mapStateToProps, mapDispatchToProps)(
  CartList
);

export default CartListContainer;
