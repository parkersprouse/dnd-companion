import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import NotFound from './pages/NotFound';

function isAuthenticated() {
  return true;
}

// User must be logged in to access this route
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated() ? <Component {...props} /> :
    <Redirect to={{pathname: '/login', state: {next: props.location.pathname}}} />
  )} />
)

// User must be logged out to access this route
const OnlyPublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !isAuthenticated() ? <Component {...props} /> :
    <Redirect to='/' />
  )} />
)

export default class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <OnlyPublicRoute exact path='/login' component={Login} />
        <PrivateRoute exact path='/profile' component={Home} />
        <Route path='*' component={NotFound} />
      </Switch>
    );
  }
}
