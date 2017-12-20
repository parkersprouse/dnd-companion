import React, { Component } from 'react';
import { Button, Intent, FormGroup } from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.renderError = this.renderError.bind(this);
    this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      errorMsg: null,
      email: '',
      password: '',
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
              <FormGroup label="E-mail" labelFor="email-input">
                <input id="email-input" name="email" className="pt-input" style={{ width: '100%' }} placeholder="E-mail" type="text" value={this.state.email} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup label="Password" labelFor="password-input">
                <input id="password-input" name="password" className="pt-input" style={{ width: '100%' }} placeholder="Password" type="password" value={this.state.password} onChange={this.handleInputChange} />
              </FormGroup>
              <div className="pt-form-group" style={{ marginBottom: '0' }}>
                <div className="pt-form-content" style={{ textAlign: 'center' }}>
                  <Button iconName="log-in" intent={Intent.PRIMARY} type="submit" loading={this.state.isSubmitting}>Login</Button>
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

  submit(event) {
    event.preventDefault();
    console.log(this.state);
    this.setState({
      isSubmitting: true,
      errorMsg: null
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
}
