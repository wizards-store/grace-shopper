import React, { Component } from 'react';
import { Navbar, AllProducts } from './components';
import store, { fetchAllProducts } from './store';
import Routes from './routes';

export default class App extends Component {
  componentDidMount () {
    store.dispatch(fetchAllProducts());
  }

  render () {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}
