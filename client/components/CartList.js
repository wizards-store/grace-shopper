import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import Payments from './Payments';
import { getCart, deleteProduct, postToCart, subtractQuantity, fetchAllProducts } from '../store';
import ProductCard from './ProductCard';

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
      handleDelete,
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
                  <ProductCard
                    product={product}
                    user={user}
                    handleDelete={handleDelete}
                    handleAddClick={handleAddClick}
                    handleSubtractClick={handleSubtractClick}
                    list={cart}
                    for="cartlist"
                  />
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
    user: state.user
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getCart: () => dispatch(getCart()),
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    // don't need "handleDelete" for every dispatch function - can be named anything you want more descriptive
    handleDelete (product) {
      dispatch(deleteProduct(product));
    },
    handleAddClick (product) { // don't even need postToCart
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
