import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import api from '../lib/api';
import utils from '../lib/utils';

export default class CharacterListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: null
    };
  }

  componentWillMount() {
    utils.getCurrentUserInfo((success, response) => {
      api.getUsersCharacters(response.id, (success, response) => {
        if (success)
          this.setState({ characters: response.content });
        else
          this.setState({ characters: [] });
      });
    });
  }

  render() {
    if (!this.state.characters)
      return null;

    if (this.state.characters.length === 0)
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <h2 className='page-title'>Your characters:</h2>
            <div className='text-center' style={{ marginTop: '3rem' }}>
              <h5>You don't have any characters yet. <a href='/characters/new'>Go add one!</a></h5>
            </div>
          </InnerContainer>
        </OuterContainer>
      );

    let chars = null;
    if (!!this.state.characters) {
      chars = this.state.characters.map((char) => {
        return (
          <div className='pt-card pt-elevation-0 pt-interactive character-card'
               onClick={() => window.location.href = '/characters/' + char.id}
               key={char.id}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header as='h3'>{ char.name }</Item.Header>
                  {
                    char.race || char.class ?
                    <Item.Meta>{ (char.race + ' ' + char.class).trim() }</Item.Meta> : null
                  }
                  { char.alignment ? <Item.Meta>{ char.alignment }</Item.Meta> : null }
                  <Item.Meta>Level { char.level }</Item.Meta>
                  {/*<Item.Description>Desc</Item.Description>
                  <Item.Extra>Extra</Item.Extra>*/}
                </Item.Content>
              </Item>
            </Item.Group>
          </div>
        );
      });
    }

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h2 className='page-title'>Your characters:</h2>
          { chars }
        </InnerContainer>
      </OuterContainer>
    );
  }
}
