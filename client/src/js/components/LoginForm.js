import React, { Component } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { Row, Col } from 'react-bootstrap';

export default class LoginPage extends Component {
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
      <div>
        <h1 style={{ marginBottom: '2rem' }}>Login</h1>
        <Row>
          <Col xs={12} md={4} mdOffset={4}>
            <div className="pt-card">
              { this.renderError() }
              <form onSubmit={this.submit}>
                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="email-input">
                    E-mail
                  </label>
                  <div className="pt-form-content">
                    <input id="email-input" name="email" className="pt-input" style={{ width: '100%' }} placeholder="E-mail" type="text" value={this.state.email} onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="password-input">
                    Password
                  </label>
                  <div className="pt-form-content">
                    <input id="password-input" name="password" className="pt-input" style={{ width: '100%' }} placeholder="Password" type="password" value={this.state.password} onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="pt-form-group" style={{ marginBottom: '0' }}>
                  <div className="pt-form-content" style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Button iconName="log-in" intent={Intent.PRIMARY} type="submit" loading={this.state.isSubmitting}>Login</Button>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  renderError() {
    if (this.state.errorMsg) {
      return (
        <div className="pt-callout pt-intent-danger" style={{ color: '#AA0000', marginBottom: '2rem' }}>
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
