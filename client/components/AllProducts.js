import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllProducts, fetchSingleProduct } from '../store';

class AllProducts extends Component {
  componentDidMount() {
    this.props.loadAllProducts();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.allProducts ? (
          <div className="all-products" onClick={this.handleClick}>
            {this.props.allProducts.map(product => {
              return (
                <div key={product.id} className="single-product">
                  <img src={product.photo} />
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>There are currently no products for sale.</p>
        )}
      </React.Fragment>
    );
  }
}

// container
function mapStateToProps(state) {
  return {
    allProducts: state.allProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAllProducts: () => {
      return dispatch(fetchAllProducts());
    },
    handleClick: () => {
      return dispatch(fetchSingleProduct());
    },
  };
}
const AllProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  AllProducts
);

export default AllProductsContainer;
