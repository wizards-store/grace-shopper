import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AllProducts = props => {
  return (
    <React.Fragment>
      {props.allProducts.length ? (
        <div className="all-products">
          {props.allProducts.map(product => {
            return (
              <div key={product.id} className="single-product">
                <img src={product.photo} />
                <Link to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
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
};

function mapStateToProps (state) {
  return {
    allProducts: state.allProducts,
  };
}

const AllProductsContainer = connect(mapStateToProps, null)(AllProducts);

export default AllProductsContainer;
