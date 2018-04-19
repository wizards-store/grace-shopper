import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store';
import Payments from './Payments';

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchProduct();
  }

  render() {
    return (
      <div>
        <h3>{this.props.singleProduct.name}</h3>
        <Payments />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allProducts: state.allProducts,
    singleProduct: state.singleProduct,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const productId = Number(ownProps.match.params.id);

  return {
    fetchProduct: () => dispatch(fetchSingleProduct(productId)),
  };
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
);

export default SingleProductContainer;
