import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='*' render={() => '404 Not Found'} />
      </Switch>
    );
  }
}
