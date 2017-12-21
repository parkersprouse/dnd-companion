import React, { Component } from 'react';
import { Button, Intent, FormGroup } from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';
import api from '../lib/api';
import FormLabel from './FormLabel';

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
      <Row>
        <Col xs={12} md={6} mdOffset={3}>
          <div className="pt-card">
            { this.renderError() }
            <form onSubmit={this.submit}>
              <FormGroup label={<FormLabel required>Username</FormLabel>} labelFor="username-input">
                <input id="username-input"
                       name="username"
                       className={this.state.usernameStyle}
                       style={{ width: '100%' }}
                       placeholder="Username"
                       type="text"
                       value={this.state.username}
                       onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup label={<FormLabel required>Password</FormLabel>} labelFor="password-input">
                <input id="password-input"
                       name="password"
                       className={this.state.passwordStyle}
                       style={{ width: '100%' }}
                       placeholder="Password"
                       type="password"
                       value={this.state.password}
                       onChange={this.handleInputChange} />
              </FormGroup>
              <div className="pt-form-group" style={{ marginBottom: '0' }}>
                <div className="pt-form-content" style={{ textAlign: 'center' }}>
                  <Button iconName="log-in"
                          intent={Intent.PRIMARY}
                          type="submit"
                          loading={this.state.isSubmitting}>Login
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    );
  }

  renderError() {
    if (this.state.errorMsg) {
      return (
        <div className="pt-callout pt-intent-danger form-error-msg">
          <span className="pt-icon-issue"></span> { this.state.errorMsg }
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
        let destination = '/';
        if (!!this.props.location.state && !!this.props.location.state.next)
          destination = this.props.location.state.next;
        window.location.href = destination;
      }
      else {
        const data = response.data;
        this.setState({
          errorMsg: data.message,
          isSubmitting: false,
          usernameStyle: data.content.usernameState ? 'pt-input' : 'pt-input pt-intent-danger',
          passwordStyle: data.content.passwordState ? 'pt-input' : 'pt-input pt-intent-danger',
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
