import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import CreateCharacterForm from '../components/character/CreateCharacterForm';

export default class CreateCharacterPage extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <button style={{ float: 'right' }} type="button" className="pt-button pt-intent-primary pt-icon-add">Create</button>
          <h1 className='page-title'>Create Character</h1>
          <CreateCharacterForm />
        </InnerContainer>
      </OuterContainer>
    );
  }
}
