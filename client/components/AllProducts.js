import React, { Component } from 'react';
import { connect } from 'react-redux';
import { products } from '../store';

class AllProducts extends Component {
  componentDidMount () {
    this.props.loadAllProducts();
  }

  render () {
    return (
      <React.Fragment>
        {this.props.allProducts ? (
          <div className="all-products">
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
function mapStateToProps (state) {
  return {
    allProducts: state.allProducts,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    loadAllProducts: () => {
      return dispatch(products());
    },
  };
}

const AllProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  AllProducts
);

export default AllProductsContainer;
