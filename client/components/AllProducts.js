import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../store';

class AllProducts extends Component {
  componentDidMount () {
    this.props.fetchAllProducts();
  }

  render () {
    let products = this.props.products;

    return (
      <React.Fragment>
        {Object.keys(products).length ? (
          <div className="all-products">
            {Object.keys(products).map(key => {
              return (
                <div key={products[key].id} className="single-product">
                  <img src={products[key].photo} />
                  <Link to={`/products/${products[key].id}`}>
                    <h3>{products[key].name}</h3>
                  </Link>
                  <p>{products[key].price}</p>
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

// Container
function mapStateToProps (state) {
  return {
    products: state.products
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts())
  };
}

const AllProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  AllProducts
);
export default AllProductsContainer;
