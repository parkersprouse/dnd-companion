import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

export default class LoginPage extends Component {
  render() {
    return (
      <Container>
        <Header />
        <LoginForm />
      </Container>
    );
  }
}
