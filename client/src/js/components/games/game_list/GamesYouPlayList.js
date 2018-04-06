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
    api.getUsersCharacters(this.props.user_id, (success, response) => {
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
    const user_char_ids = _.map(this.state.characters, 'id');

    return _.map(this.props.games, (game) => {
      const user_char_ids_in_game = _.intersection(game.char_ids, user_char_ids);

      // We can't use map here because elements that don't match will return
      // undefined and that will ruin the collection.
      const char_names = [];
      _.forEach(this.state.characters, (char) => {
        if (user_char_ids_in_game.indexOf(char.id) > -1)
          char_names.push(char.name);
      });

      return <div className='pt-card pt-elevation-0 pt-interactive character-card'
                  onClick={() => window.location.href = '/games/' + game.id}
                  key={game.id}>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Item.Header as='h3'>{ game.name }</Item.Header>
                      <Item.Description>{ game.description }</Item.Description>
                      <Item.Meta>Characters: { _.join(char_names, ', ') }</Item.Meta>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </div>
    });
  }
}
