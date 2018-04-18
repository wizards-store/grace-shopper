import React, { Component } from 'react';
import { Navbar, AllProducts } from './components';
import store, { fetchAllProducts } from './store';
import Routes from './routes';

export default class App extends Component {
  componentDidMount() {
    // OB/JS: watch out for this, can be hard to find (consider fetching in the components that need it)
    store.dispatch(fetchAllProducts());
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}
