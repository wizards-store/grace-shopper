import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import CartList from './CartList';
import { Menu } from 'semantic-ui-react';

class Navbar extends React.Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render () {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu secondary className="navMenu">
          <Menu.Item
            href="/"
            name="Wizard Supply Shop"
            className="homeLogo"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            href="/products"
            name="Products"
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
        <Menu.Menu position="right">
            <Menu.Item
              href="/cartList"
              name="Cart"
              active={activeItem === 'friends'}
              onClick={this.handleItemClick}
            />
          {this.props.isLoggedIn ? (
            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={this.props.handleClick}
            />
            ) : (
              <React.Fragment>
                <Menu.Item
                  href="/login"
                  name="login"
                  active={activeItem === 'login'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  href="/signup"
                  name="signup"
                  active={activeItem === 'signup'}
                  onClick={this.handleItemClick}
                />
              </React.Fragment>
            )}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick () {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
