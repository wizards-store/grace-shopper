import React, { Component } from 'react';
import { Dropdown, Icon, Input, Menu, Checkbox } from 'semantic-ui-react';
import SearchInput from 'react-search-input';


const Sidebar = props => (
  <Menu vertical floated>
      <Menu.Item>
          <Input placeholder="Search..." onChange={props.onChange} />
      </Menu.Item>

      {props.categories.map(category => {
        return (
          <React.Fragment key={category.id}>
            <Checkbox className="checkbox" label={category.name} onFilterClick={props.onFilterClick} />
            <br />
          </React.Fragment>
        );
      })}
  </Menu>
);


export default Sidebar;
