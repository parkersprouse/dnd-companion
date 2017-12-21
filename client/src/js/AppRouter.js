import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import utils from './lib/utils';

class PrivateRoute extends Route {
  componentWillMount() {
    utils.isLoggedIn((loggedIn) => {
      this.setState({ isLoggedIn: loggedIn });
    });
  }

  render() {
    if(this.state.isLoggedIn !== undefined) {
      if(this.state.isLoggedIn) return <this.props.component {...this.props} />
      else return <Redirect to={{ pathname: '/login', state: { next: this.props.location.pathname } }} />
    }
    return null;
  }
}

class OnlyPublicRoute extends Route {
  componentWillMount() {
    utils.isLoggedIn((loggedIn) => {
      this.setState({ isLoggedIn: loggedIn });
    });
  }

  render() {
    if(this.state.isLoggedIn !== undefined) {
      if(this.state.isLoggedIn) return <Redirect to='/' />
      else return <this.props.component {...this.props} />
    }
    return null;
  }
}

export default class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <OnlyPublicRoute exact path='/login' component={Login} />
        <OnlyPublicRoute exact path='/register' component={Register} />
        <PrivateRoute exact path='/profile' component={ProfilePage} />
        <Route exact path='/logout' render={() => { utils.logout(); return <Redirect to='/' /> }} />
        <Route path='*' component={NotFound} />
      </Switch>
    );
  }
}
