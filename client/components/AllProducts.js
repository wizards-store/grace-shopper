import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../store';
import CartForm from './CartForm';
import Sidebar from './Sidebar';
import { Card, Icon, Image } from 'semantic-ui-react';
import { ReactiveBase } from '@appbaseio/reactivesearch';

class AllProducts extends Component {
  componentDidMount () {
    this.props.fetchAllProducts();
  }

  render () {
    let products = this.props.products;
    let categories = [];
    Object.keys(products).forEach(key => {
      let product = products[key];
      product.categories.forEach(category => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    });
    console.log('products', products);

    return (
      <React.Fragment>
        <ReactiveBase app="wizard-store" credentials="none">
          <Sidebar categories={categories} />
        </ReactiveBase>
        {Object.keys(products).length ? (
          <div className="all-products">
            {Object.keys(products).map(key => {
              let product = products[key];
              return (
                <div key={product.id} className="single-product">
                  <Card>
                    <Image src={product.photo} className="product-picture" />
                    <Card.Content>
                      <Link to={`/products/${product.id}`}>
                        <h3>{product.name}</h3>
                      </Link>
                    </Card.Content>
                    <Card.Content extra>
                      <p>{product.price}</p>
                      <CartForm product={product} />
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
