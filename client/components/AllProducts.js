import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../store';
import CartButton from './CartButton';
import WishlistButton from './WishlistButton';
import Sidebar from './Sidebar';
import { Card, Image } from 'semantic-ui-react';
import { createFilter } from 'react-search-input';

class AllProducts extends Component {
  constructor () {
    super();
    this.state = {
      searchTerm: '',
      filteredCategories: []
    };

    this.searchUpdated = this.searchUpdated.bind(this);
    this.filterUpdated = this.filterUpdated.bind(this);
  }

  componentDidMount () {
    this.props.fetchAllProducts();
  }

  searchUpdated (event) {
    this.setState({ searchTerm: event.target.value });
  }

  filterUpdated (event, data) {
    data.checked
      ? this.setState({
          filteredCategories: [...this.state.filteredCategories, data.label]
        })
      : this.setState({
          filteredCategories: this.state.filteredCategories.filter(
            name => name !== data.label
          )
        });
  }

  render () {
    let products = this.props.products;
    let categories = [];
    let user = this.props.user;

    Object.values(products).forEach(product => {
      product.categories.forEach(category => {
        if (!categories.includes(category.name)) {
          categories.push(category.name);
        }
      });
    });

    const filteredProducts = Object.values(products)
      .filter(createFilter(this.state.searchTerm, ['name']))
      .filter(filteredProduct => {
        return this.state.filteredCategories.length
          ? filteredProduct.categories.filter(category =>
              this.state.filteredCategories.includes(category.name)
            ).length
          : filteredProduct;
      });

    return (
      <React.Fragment>
        <Sidebar
          categories={categories}
          onChange={this.searchUpdated}
          onFilterClick={this.filterUpdated}
        />

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
                      <CartButton product={product} />
                      {user.id ? <WishlistButton product={product} /> : null}
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
    products: state.products,
    user: state.user
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
