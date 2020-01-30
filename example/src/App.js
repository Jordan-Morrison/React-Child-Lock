import React, { Component } from 'react';

import SiteLock from 'react-site-lock';

export default class App extends Component {
  render () {
    return (
      <div className="app">
        <SiteLock password="a"/>
        <h1>WELCOME TO MY SITE</h1>
      </div>
    )
  }
}
