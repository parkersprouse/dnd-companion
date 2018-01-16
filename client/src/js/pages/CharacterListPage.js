import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import api from '../lib/api';
import utils from '../lib/utils';

export default class CharacterListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    utils.getCurrentUserInfo((success, response) => {
      api.getUsersCharacters(response.id, (success, response) => {
        this.setState({ characters: response.content });
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          Your characters:<br />
          { this.state.characters ? this.state.characters.length : null }
        </InnerContainer>
      </OuterContainer>
    );
  }
}
