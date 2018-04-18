import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store';

const SingleProduct = props => {
  const product = props.fetchProduct;

  return (
    <div>
      <h3>{product.name}</h3>
    </div>
  );
};

function mapDispatchToProps(dispatch, ownProps) {
  const productId = Number(ownProps.match.params.id);
  console.log('what is productID', productId);

  return {
    fetchProduct: fetchSingleProduct(productId),
  };
}

const SingleProductContainer = connect(null, mapDispatchToProps)(SingleProduct);

export default SingleProductContainer;
