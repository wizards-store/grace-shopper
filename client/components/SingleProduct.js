import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store';
import { Card, Image } from 'semantic-ui-react';
import CartButton from './CartButton';

class SingleProduct extends Component {
  componentDidMount () {
    this.props.fetchProduct();
  }

  render () {
    return (
      <React.Fragment>
        {this.props.product ? (
          <div>
            <Card>
              <Image
                src={this.props.product.photo}
                className="product-picture"
              />
              <Card.Content>
                <h3>{this.props.product.name}</h3>
              </Card.Content>
              <Card.Content extra>
                <h3>Price:</h3>
                <p>{this.props.product.price}</p>
                <h3>Product Description:</h3>
                <p>{this.props.product.description}</p>
                <CartButton product={this.props.product} />
              </Card.Content>
            </Card>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps (state, ownProps) {
  const productId = Number(ownProps.match.params.id);
  return {
    product: state.products[productId]
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  const productId = Number(ownProps.match.params.id);

  return {
    fetchProduct: () => dispatch(fetchSingleProduct(productId))
  };
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
);
export default SingleProductContainer;
