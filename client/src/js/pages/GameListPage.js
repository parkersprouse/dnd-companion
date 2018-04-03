import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';

export default class GameListPage extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h1 className='page-title'>Your Games</h1>
          Games you run: 0
          <hr />
          Games you have a character in: 0
        </InnerContainer>
      </OuterContainer>
    );
  }

}
