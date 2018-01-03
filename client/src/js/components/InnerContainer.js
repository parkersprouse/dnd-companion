import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

export default class InnerContainer extends Component {
  render() {
    return (
      <Container>
        { this.props.children }
      </Container>
    );
  }
}
