import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

export default class LoginPage extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h1 className="page-title">Login</h1>
          <LoginForm />
          <div className="login-form-extra-links">
            <a href="/register">Need an account?</a> | <a href="/register">Forgot password?</a>
          </div>
        </InnerContainer>
      </OuterContainer>
    );
  }
}
