import React, { Component } from 'react';
import { Button, Intent } from '@blueprintjs/core';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 style={{ marginBottom: '2rem' }}>Login</h1>
        <div className="row">
          <div className="col-xs-12 col-md-4 col-md-offset-4">
            <div className="pt-card">
              <div className="pt-form-group">
                <label className="pt-label" htmlFor="email-input">
                  E-mail
                </label>
                <div className="pt-form-content">
                  <input id="email-input" className="pt-input" style={{ width: '100%' }} placeholder="E-mail" type="text" />
                </div>
              </div>
              <div className="pt-form-group">
                <label className="pt-label" htmlFor="password-input">
                  Password
                </label>
                <div className="pt-form-content">
                  <input id="password-input" className="pt-input" style={{ width: '100%' }} placeholder="Password" type="password" />
                </div>
              </div>
              <div className="pt-form-group" style={{ marginBottom: '0' }}>
                <div className="pt-form-content" style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Button iconName="log-in" intent={Intent.PRIMARY}>Login</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
