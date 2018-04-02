import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import CreateGameForm from '../components/games/game_creation/CreateGameForm';

export default class CreateGamePage extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h1 className='page-title'>Create Game</h1>
          <CreateGameForm />
        </InnerContainer>
      </OuterContainer>
    );
  }

}
