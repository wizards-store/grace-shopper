import React, { Component } from 'react';
import { Navbar } from './components';
import Routes from './routes';

export default class App extends Component {
  render () {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}
