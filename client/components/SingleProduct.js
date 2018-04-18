import React, { Component } from 'react';
import { connect } from 'react-redux';

const SingleProduct = props => {
  return (
    <div>
      <h3>{props.singleProduct.name}</h3>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    singleProduct: state.singleProduct,
  };
}

const SingleProductContainer = connect(mapStateToProps, null)(SingleProduct);

export default SingleProductContainer;
