import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { getWishlist, deleteWishlistProduct, postToWishlist } from '../store';
import ProductCard from './ProductCard';

class Wishlist extends Component {
  componentDidMount () {
    this.props.getWishlist();
  }

  render () {
    const {
      wishlist,
      user,
      handleDelete
    } = this.props;

    console.log(user);

    return (
      <div>
        <h3>Items {user.email} loves</h3>
        {Object.keys(wishlist).length ? (
          <div>
            {Object.values(wishlist).map(product => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleDelete={handleDelete}
                  list={wishlist}
                  for="wishlist"
                />
              );
            })}
          </div>
        ) : (
          <p>There is currently nothing in your wishlist.</p>
        )}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    wishlist: state.wishlist,
    user: state.user
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getWishlist: () => dispatch(getWishlist()),
    handleDelete (product) {
      dispatch(deleteWishlistProduct(product));
    }
  };
}

const WishlistContainer = connect(mapStateToProps, mapDispatchToProps)(
  Wishlist
);

export default WishlistContainer;
