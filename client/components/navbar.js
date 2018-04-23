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
          <Link to="/">
            <Menu.Item
              name="Wizard Supply Shop"
              className="homeLogo"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to="/products">
            <Menu.Item
              name="Products"
              active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Menu.Menu position="right">
            <Link to="/cartList">
              <Menu.Item
                name="Cart"
                active={activeItem === 'friends'}
                onClick={this.handleItemClick}
              />
            </Link>
            {this.props.isLoggedIn ? (
              <Menu.Item
                name="logout"
                active={activeItem === 'logout'}
                onClick={this.props.handleClick}
              />
            ) : (
              <React.Fragment>
                <Link to="/login">
                  <Menu.Item
                    name="login"
                    active={activeItem === 'login'}
                    onClick={this.handleItemClick}
                  />
                </Link>
                <Link to="/signup">
                  <Menu.Item
                    name="signup"
                    active={activeItem === 'signup'}
                    onClick={this.handleItemClick}
                  />
                </Link>
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
