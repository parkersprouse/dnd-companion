import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    return (
      <Container>
        <Header />
        Login here
      </Container>
    );
  }
}
