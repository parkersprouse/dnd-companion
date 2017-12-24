import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

export default class RegisterPage extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h1 className='page-title'>Register</h1>
          <RegisterForm />
          <div className='login-form-extra-links'>
            <a href='/login'>Login</a>
          </div>
        </InnerContainer>
      </OuterContainer>
    );
  }
}
