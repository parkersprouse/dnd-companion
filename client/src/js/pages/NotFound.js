import React, { Component } from 'react';
import { NonIdealState } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';

export default class Home extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <NonIdealState visual='disable' title='Page Not Found'
            description={<span>The page you were looking for doesn't seem to exist.</span>} />
        </InnerContainer>
      </OuterContainer>
    );
  }
}
