import React, { Component } from 'react';
import { InputGroup, NonIdealState, AnchorButton, Intent } from "@blueprintjs/core";
import Container from './Container';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <NonIdealState visual="disable" title="Page Not Found"
          description={<span>The page you were looking for doesn't seem to exist.</span>}
          action={<AnchorButton iconName="home" intent={Intent.PRIMARY} href="/">Go Home</AnchorButton>} />
      </Container>
    );
  }
}
