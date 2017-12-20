import React, { Component } from 'react';
import { Button, Intent, FormGroup } from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';
import api from '../lib/api';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.renderError = this.renderError.bind(this);
    this.renderSuccess = this.renderSuccess.bind(this);
    this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      errorMsg: null,
      success: false,
      isSubmitting: false,
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      emailStyle: 'pt-input',
      usernameStyle: 'pt-input',
      passwordStyle: 'pt-input',
      passwordConfirmStyle: 'pt-input'
    }
  }

  render() {
    return (
      <Row>
        <Col xs={12} md={6} mdOffset={3}>
          <div className="pt-card">
            { this.renderError() }
            { this.renderSuccess() }
            <form onSubmit={this.submit}>
              <FormGroup label="E-mail" labelFor="email-input">
                <input id="email-input" name="email" className={this.state.emailStyle} style={{ width: '100%' }} placeholder="E-mail" type="text" value={this.state.email} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup label="Username" labelFor="username-input">
                <input id="username-input" name="username" className={this.state.usernameStyle} style={{ width: '100%' }} placeholder="Username" type="text" value={this.state.username} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup label="Password" labelFor="password-input">
                <input id="password-input" name="password" className={this.state.passwordStyle} style={{ width: '100%' }} placeholder="Password" type="password" value={this.state.password} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup label="Confirm Password" labelFor="confirm-password-input">
                <input id="confirm-password-input" name="passwordConfirm" className={this.state.passwordConfirmStyle} style={{ width: '100%' }} placeholder="Confirm Password" type="password" value={this.state.passwordConfirm} onChange={this.handleInputChange} />
              </FormGroup>
              <div className="pt-form-group" style={{ marginBottom: '0' }}>
                <div className="pt-form-content" style={{ textAlign: 'center' }}>
                  <Button iconName="new-person" intent={Intent.PRIMARY} type="submit" loading={this.state.isSubmitting}>Register</Button>
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
          { this.state.errorMsg }
        </div>
      );
    }
    return null;
  }

  renderSuccess() {
    if (this.state.success) {
      return (
        <div className="pt-callout pt-intent-success form-success-msg">
          Your account has been successfully registered.<br />
          You may now <a href="/login">login</a>.
        </div>
      );
    }
    return null;
  }

  resetState() {
    this.setState({
      errorMsg: null,
      success: false,
      emailStyle: 'pt-input',
      usernameStyle: 'pt-input',
      passwordStyle: 'pt-input',
      passwordConfirmStyle: 'pt-input'
    })
  }

  submit(event) {
    event.preventDefault();
    this.resetState();
    this.setState({ isSubmitting: true });

    api.register({
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confirmpassword: this.state.passwordConfirm
    }, (success, response) => {
      if (success) {
        this.setState({
          success: true,
          isSubmitting: false
        });
      }
      else {
        const data = response.data;
        this.setState({
          errorMsg: data.message,
          isSubmitting: false,
          emailStyle: data.content.emailState ? 'pt-input' : 'pt-input pt-intent-danger',
          usernameStyle: data.content.usernameState ? 'pt-input' : 'pt-input pt-intent-danger',
          passwordStyle: data.content.passwordState ? 'pt-input' : 'pt-input pt-intent-danger',
          passwordConfirmStyle: data.content.confirmPasswordState ? 'pt-input' : 'pt-input pt-intent-danger'
        });
      }
    });

    this.setState({
      isSubmitting: true,
      errorMsg: null
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }
}
