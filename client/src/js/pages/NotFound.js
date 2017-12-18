import React, { Component } from 'react';
import { NonIdealState } from "@blueprintjs/core";
import Container from '../components/Container';
import Header from '../components/Header';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header />
        <NonIdealState visual="disable" title="Page Not Found"
          description={<span>The page you were looking for doesn't seem to exist.</span>} />
      </Container>
    );
  }
}
