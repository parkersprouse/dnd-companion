import React, { Component } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import CreateGameForm from '../components/games/game_creation/CreateGameForm';
import utils from '../lib/utils';
import _ from 'lodash';
import validator from 'validator';
import api from '../lib/api';

export default class JoinGamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentWillMount() {
    utils.getCurrentUserInfo((success, response) => {
      if (success)
        this.setState({ userid: response.id });
    });
  }

  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <Button intent={Intent.PRIMARY}
                  iconName='add'
                  type='submit'
                  loading={this.state.is_submitting}
                  //className='pt-large'
                  style={{ float: 'right' }}
                  onClick={this.submit}>Create
          </Button>
          <h1 className='page-title'>Create Game</h1>
          { this.renderErrors() }
          <form onSubmit={this.submit}>
            <CreateGameForm onInputChange={this.onInputChange} setRootState={this.setRootState} root_state={this.state} />
          </form>
        </InnerContainer>
      </OuterContainer>
    );
  }

  renderErrors = () => {
    if (!this.state.error) return null;
    return (
      <div className='pt-callout pt-intent-danger form-error-msg'>
        <span className='pt-icon-error'></span> { this.state.error }
      </div>
    );
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  setRootState = (changes) => {
    this.setState(changes);
  }

  submit = (event) => {
    event.preventDefault();
    this.setState({ error: null, is_submitting: true });
    api.createGame({}, (success, response) => {
      if (success)
        window.location.href = '/games/' + response.content.id;
      else
        this.setState({ error: response.message, is_submitting: false });
    });
  }

}
