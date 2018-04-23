import React, { Component } from 'react';
import { Dropdown, Icon, Input, Menu, Checkbox } from 'semantic-ui-react';
import { DataSearch } from '@appbaseio/reactivesearch';

export default class Sidebar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render () {
    const { activeItem } = this.state;

    console.log('categories', this.props.categories);

    return (
      <Menu vertical floated>
          <Menu.Item>
              <DataSearch
                componentId="productSearch"
                dataField={'name'}
                queryFormat="and" />
            {/*<Input placeholder="Search..." />*/}
          </Menu.Item>

          {this.props.categories.map(category => {
            return (
              <React.Fragment key={category.id}>
                <Checkbox className="checkbox" label={category.name} />
                <br />
              </React.Fragment>
            );
          })}

        {/*<Dropdown item text="More">
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" text="Edit Profile" />
            <Dropdown.Item icon="globe" text="Choose Language" />
            <Dropdown.Item icon="settings" text="Account Settings" />
          </Dropdown.Menu>
        </Dropdown>*/}
      </Menu>
    );
  }
}
