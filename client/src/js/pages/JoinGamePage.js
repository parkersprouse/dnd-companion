import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import JoinGameForm from '../components/games/game_creation/JoinGameForm';

export default class CreateGamePage extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h1 className='page-title'>Join Game</h1>
          <JoinGameForm />
        </InnerContainer>
      </OuterContainer>
    );
  }

}
