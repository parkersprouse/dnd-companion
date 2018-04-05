import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import _ from 'lodash';
import api from '../../../lib/api';

export default class GamesYouPlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: null
    };
  }

  componentWillMount() {
    api.getUsersCharacters(this.props.user, (success, response) => {
      if (success)
        this.setState({ characters: response.content });
      else
        this.setState({ characters: [] });
    });
  }

  render() {
    if (!this.state.characters) return null;
    return (
      <div>
        <div>Total Games: { this.props.games.length }</div>
        { this.createGameList() }
      </div>
    );
  }

  createGameList = () => {
    const char_ids = _.map(this.state.characters, 'id');
    
    return _.map(this.props.games, (game) => {
      const char_id = _.intersection(game.char_ids, char_ids)[0];
      const char_name = _.find(this.state.characters, (char) => char.id === char_id).name;

      return <div className='pt-card pt-elevation-0 pt-interactive character-card'
                  onClick={() => window.location.href = '/games/' + game.id}
                  key={game.id}>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Item.Header as='h3'>{ game.name }</Item.Header>
                      <Item.Description>{ game.description }</Item.Description>
                      <Item.Meta>Character: { char_name }</Item.Meta>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </div>
    });
  }
}
