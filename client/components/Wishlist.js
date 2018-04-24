import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { getWishlist, deleteWishlistProduct, post } from '../store';

const Wishlist = (props) => {
  const { wishlist, user } = props;
  return (
    <div>
      {Object.keys(wishlist).length ? (
        <div>
          {Object.values(wishlist).map(product => {
            return (
              <div key={product.id}>
                <Card>
                  <Image src={product.photo} />
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <p>There is currently nothing in your wishlist.</p>
      )}
    </div>
  );
};


function mapStateToProps (state) {
  return {
    wishlist: state.wishlist,
    user: state.user
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getWishlist: () => dispatch(getWishlist())
  };
}

const WishlistContainer = connect(mapStateToProps, mapDispatchToProps)(
  Wishlist
);

export default WishlistContainer;
