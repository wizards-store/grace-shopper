import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import Payments from './Payments';
// import { fetchAllCartItems }

class CartList extends Component {
  // componentDidMount() {
  //   this.props.fetchAllCartItems();
  // }

  render () {
    return (
      <div>
        <Card>
          <Image src="/assets/images/avatar/large/daniel.jpg" />
          <Card.Content>
            <Card.Header>Elder Wand</Card.Header>
            <Card.Meta>Created Date</Card.Meta>
            <Card.Description>Description</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              Quantity
            </a>
            <hr />
            <a>
              <Icon name="user" />
              Price
            </a>
          </Card.Content>
        </Card>
        <Payments />
      </div>
    );
  }
}

const CartListContainer = connect(null, null)(CartList);

export default CartListContainer;
