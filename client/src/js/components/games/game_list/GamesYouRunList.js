import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import _ from 'lodash';

export default class GamesYouRunList extends Component {
  render() {
    return (
      <div>
        <div>Total Games: { this.props.games.length }</div>
        { this.createGameList() }
      </div>
    );
  }

  createGameList = () => {
    return _.map(this.props.games, (game) => {
      return <div className='pt-card pt-elevation-0 pt-interactive character-card'
                  onClick={() => window.location.href = '/games/' + game.id}
                  key={game.id}>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Item.Header as='h3'>{ game.name }</Item.Header>
                      <Item.Description>{ game.description }</Item.Description>
                      <Item.Meta>Characters: { game.char_ids.length }</Item.Meta>
                      <Item.Meta>Players: { game.user_ids.length }</Item.Meta>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </div>
    });
  }
}
