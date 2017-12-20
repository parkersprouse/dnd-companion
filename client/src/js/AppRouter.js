import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import utils from './lib/utils';

function isAuthenticated() {
  utils.isLoggedIn((loggedIn) => {
    return loggedIn;
  });
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
        <OnlyPublicRoute exact path='/register' component={Register} />
        <PrivateRoute exact path='/profile' component={Home} />
        <Route path='*' component={NotFound} />
      </Switch>
    );
  }
}
