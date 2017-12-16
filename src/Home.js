import React, { Component } from 'react';
import Container from './Container';
import Header from './Header';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header />
        Hello
      </Container>
    );
  }
}
