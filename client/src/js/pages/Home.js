import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';

export default class Home extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          Hello
        </InnerContainer>
      </OuterContainer>
    );
  }
}
