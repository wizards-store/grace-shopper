import React, { Component } from 'react';
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header
} from 'semantic-ui-react';
import AllProductsContainer from './AllProducts';

class SidebarContainer extends Component {
  render () {
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            visible={true}
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item name="home">Home</Menu.Item>
            <Menu.Item name="gamepad">Games</Menu.Item>
            <Menu.Item name="camera">Channels</Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <AllProductsContainer />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SidebarContainer;
