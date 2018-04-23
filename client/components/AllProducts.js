import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../store';
import CartForm from './CartForm';
import Sidebar from './Sidebar';
import { Card, Icon, Image } from 'semantic-ui-react';
import { createFilter } from 'react-search-input';

class AllProducts extends Component {
  constructor () {
    super();
    this.state = {
      searchTerm: '',
      filteredCategories: []
    };

    this.searchUpdated = this.searchUpdated.bind(this);
  }

  componentDidMount () {
    this.props.fetchAllProducts();
  }

  searchUpdated (event) {
    this.setState({ searchTerm: event.target.value });
  }

  filterUpdated (event) {
    this.setState({ filteredCategories: [...this.filteredCategories, event.target.label] })
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

    const filteredProducts = Object.values(products).filter(createFilter(this.state.searchTerm, ['name']));

    return (
      <React.Fragment>
        <Sidebar categories={categories} onChange={this.searchUpdated} onFilterClick={this.filterUpdated}/>
        {Object.keys(products).length ? (
          <div className="all-products">
            {filteredProducts.map(product => {
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
