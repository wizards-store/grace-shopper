import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store';
import CartForm from './CartForm';

class SingleProduct extends Component {
  componentDidMount () {
    this.props.fetchProduct();
  }

  render () {
    return (
      <div>
        {this.props.product ? <h3>{this.props.product.name}</h3> : null}
        <CartForm product={this.props.product} />
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  const productId = Number(ownProps.match.params.id);
  return {
    product: state.products[productId],
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  const productId = Number(ownProps.match.params.id);

  return {
    fetchProduct: () => dispatch(fetchSingleProduct(productId)),
  };
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
);
export default SingleProductContainer;
