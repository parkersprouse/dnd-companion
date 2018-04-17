import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import api from '../../../lib/api';

export default class CharactersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chars: []
    }
  }

  componentWillMount() {
    // I'm playing a dangerous game with this, but that's the way it's gonna be for now.
    // That's the story of this entire app.
    for (let i = 0; i < this.props.game.char_ids.length; i++) {
      api.getCharacter({ id: this.props.game.char_ids[i]}, (success, response) => {
        if (success)
          this.setState({ chars: this.state.chars.concat([response.content[0]]) });
      });
    }
  }

  render() {
    if (this.state.chars.length !== this.props.game.char_ids.length)
      return null;

    return (
      <div className='pt-card'>
        <div className='game-show-panel-header'>
          Characters
        </div>
        { this.renderChars() }
      </div>
    );
  }

  clickChar = (char) => {
    if (char.userid !== this.props.user.id) return;
    this.props.setRootState({ selected_char: char });
  }

  renderChars = () => {
    return this.state.chars.map((char) => {
      return (
        <div key={char.id} className={'pt-card pt-elevation-0 character-card' + (char.userid === this.props.user.id ? ' pt-interactive' : '')}
             onClick={() => this.clickChar(char)}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header as='h5'>{ char.name }</Item.Header>
                {
                  char.race || char.class ?
                  <Item.Meta>{ (char.race + ' ' + char.class).trim() }</Item.Meta> : null
                }
                <Item.Meta>Level { char.level }</Item.Meta>
              </Item.Content>
            </Item>
          </Item.Group>
        </div>
      );
    });
  }
}
