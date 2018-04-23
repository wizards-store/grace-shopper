import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../store';
import CartForm from './CartForm';
import { Card, Icon, Image } from 'semantic-ui-react';

class AllProducts extends Component {
  componentDidMount () {
    this.props.fetchAllProducts();
  }

  render () {
    let products = this.props.products;

    return (
      <div className="allProduct-background">
        <React.Fragment>
          {Object.keys(products).length ? (
            <div className="all-products">
              {Object.keys(products).map(key => {
                return (
                  <div key={products[key].id} className="single-product">
                    <Card>
                      <Image
                        src={products[key].photo}
                        className="product-picture"
                      />
                      <Card.Content>
                        <Link to={`/products/${products[key].id}`}>
                          <h3>{products[key].name}</h3>
                        </Link>
                      </Card.Content>
                      <Card.Content extra>
                        <p>{products[key].price}</p>
                        <CartForm product={products[key]} />
                      </Card.Content>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>There are currently no products for sale.</p>
          )}
        </React.Fragment>
      </div>
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
