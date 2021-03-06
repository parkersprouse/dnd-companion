import React, { Component } from 'react';
import { Button, Intent, FormGroup } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import api from '../lib/api';
import FormLabel from './FormLabel';
import Cookie from 'universal-cookie';

const cookie = new Cookie();

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.renderError = this.renderError.bind(this);
    this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      errorMsg: null,
      username: '',
      password: '',
      usernameStyle: 'pt-input',
      passwordStyle: 'pt-input',
      isSubmitting: false
    }
  }

  render() {
    return (
      <Grid stackable centered>
        <Grid.Row stretched>
          <Grid.Column width={6}>
            <div className='pt-card'>
              { this.renderError() }
              <form onSubmit={this.submit}>
                <FormGroup label={<FormLabel required>Username</FormLabel>} labelFor='username-input'>
                  <input id='username-input'
                         name='username'
                         className={this.state.usernameStyle}
                         style={{ width: '100%' }}
                         placeholder='Username'
                         type='text'
                         value={this.state.username}
                         onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup label={<FormLabel required>Password</FormLabel>} labelFor='password-input'>
                  <input id='password-input'
                         name='password'
                         className={this.state.passwordStyle}
                         style={{ width: '100%' }}
                         placeholder='Password'
                         type='password'
                         value={this.state.password}
                         onChange={this.handleInputChange} />
                </FormGroup>
                <div className='pt-form-group' style={{ marginBottom: '0' }}>
                  <div className='pt-form-content' style={{ textAlign: 'center' }}>
                    <Button iconName='log-in'
                            intent={Intent.PRIMARY}
                            type='submit'
                            loading={this.state.isSubmitting}>Login
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  renderError() {
    if (this.state.errorMsg) {
      return (
        <div className='pt-callout pt-intent-danger form-error-msg'>
          <span className='pt-icon-error'></span> { this.state.errorMsg }
        </div>
      );
    }
    return null;
  }

  resetState() {
    this.setState({
      errorMsg: null,
      usernameStyle: 'pt-input',
      passwordStyle: 'pt-input'
    })
  }

  submit(event) {
    event.preventDefault();
    this.resetState();
    this.setState({ isSubmitting: true });

    api.login({
      username: this.state.username,
      password: this.state.password,
    }, (success, response) => {
      if (success) {
        cookie.set('token', response.content, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false, secure: false });
        let destination = '/';
        if (!!this.props.location.state && !!this.props.location.state.next)
          destination = this.props.location.state.next;
        window.location.href = destination;
      }
      else {
        this.setState({
          errorMsg: response.message,
          isSubmitting: false,
          usernameStyle: response.content.usernameState ? 'pt-input' : 'pt-input pt-intent-danger',
          passwordStyle: response.content.passwordState ? 'pt-input' : 'pt-input pt-intent-danger',
        });
      }
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }
}
