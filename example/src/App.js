import React, { Component } from 'react';
import BetaNotice from './BetaNotice';
import ChildLock from 'react-child-lock';

export default class App extends Component {
  render () {
    return (
      <div className="app">
        <ChildLock password="pass" customContent={<BetaNotice/>}/>
        <h1>WELCOME TO MY SITE</h1>
      </div>
    )
  }
}
