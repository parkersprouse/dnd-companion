import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CharacterListPage from './pages/CharacterListPage';
import CharacterShowPage from './pages/CharacterShowPage';
import CreateCharacterPage from './pages/CreateCharacterPage';
import UsersListPage from './pages/UsersListPage';
import UserShowPage from './pages/UserShowPage';
import GameListPage from './pages/GameListPage';
//import CharacterShowPage from './pages/CharacterShowPage';
import CreateGamePage from './pages/CreateGamePage';
import JoinGamePage from './pages/JoinGamePage';
import ArmorSearcher from './pages/ArmorSearcher';
import EquipmentSearcher from './pages/EquipmentSearcher';
import SpellSearcher from './pages/SpellSearcher';
import TrinketsSearcher from './pages/TrinketsSearcher';
import WeaponsSearcher from './pages/WeaponsSearcher';
import AccountRecovery from './pages/AccountRecovery';
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

        <PrivateRoute exact path='/characters' component={CharacterListPage} />
        <PrivateRoute exact path='/characters/new' component={CreateCharacterPage} />
        <PrivateRoute exact path='/characters/:id' component={CharacterShowPage} />

        <PrivateRoute exact path='/users' component={UsersListPage} />
        <PrivateRoute exact path='/users/:id' component={UserShowPage} />

        <PrivateRoute exact path='/games' component={GameListPage} />
        <PrivateRoute exact path='/games/new' component={CreateGamePage} />
        <PrivateRoute exact path='/games/join' component={JoinGamePage} />
        {/* <PrivateRoute exact path='/games/:id' component={GameShowPage} /> */}

        <Route exact path='/info/armor' component={ArmorSearcher} />
        <Route exact path='/info/equipment' component={EquipmentSearcher} />
        <Route exact path='/info/spells' component={SpellSearcher} />
        <Route exact path='/info/trinkets' component={TrinketsSearcher} />
        <Route exact path='/info/weapons' component={WeaponsSearcher} />

        <OnlyPublicRoute exact path='/account-recovery' component={AccountRecovery} />
        <Route exact path='/logout' render={() => { utils.logout(); return <Redirect to='/' /> }} />
        <Route path='*' component={NotFound} />
      </Switch>
    );
  }
}
