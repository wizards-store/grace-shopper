import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { postToWishlist } from '../store';

const WishlistButton = props => {
  const { product, handleClick } = props;

  return (
    <Button onClick={evt => handleClick(product, evt)} inverted color="olive">
      Add to wishlist
    </Button>
  );
};

function mapDispatchToProps (dispatch) {
  return {
    handleClick (product, evt) {
      evt.preventDefault();
      dispatch(postToWishlist(product));
    }
  };
}

const WishlistButtonContainer = connect(null, mapDispatchToProps)(WishlistButton);

export default WishlistButtonContainer;
