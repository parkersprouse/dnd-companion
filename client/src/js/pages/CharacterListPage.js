import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import { Item } from 'semantic-ui-react'
import api from '../lib/api';
import utils from '../lib/utils';

export default class CharacterListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: []
    };
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

    const chars = this.state.characters.map((char) => {
      return <div className='pt-card pt-elevation-0 pt-interactive character-card'
                  onClick={() => window.location.href = '/characters/' + char.id}>
              <Item.Group>
                <Item>
                  <Item.Content>
                    <Item.Header as='a'>{char.name}, Level {char.level}</Item.Header>
                    {/*<Item.Meta></Item.Meta>*/}
                    <Item.Description>
                      {char.race} {char.class}, {char.alignment}
                    </Item.Description>
                    {/*<Item.Extra>Additional Details</Item.Extra>
                    */}
                  </Item.Content>
                </Item>
              </Item.Group>
            </div>
    });

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h3 className='page-title'>Your characters:</h3>
          {chars}
        </InnerContainer>
      </OuterContainer>
    );
  }
}
