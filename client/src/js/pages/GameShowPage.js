import React, { Component } from 'react';
import { NonIdealState } from '@blueprintjs/core';
import { Grid, Loader } from 'semantic-ui-react';
import _ from 'lodash';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import api from '../lib/api';
import utils from '../lib/utils';
import CharacterShowTabs from '../components/characters/character_viewer/CharacterShowTabs';
import CharactersPanel from '../components/games/game_show/CharactersPanel';
import ChatPanel from '../components/games/game_show/ChatPanel';
import GameCodePanel from '../components/games/game_show/GameCodePanel';

export default class GameShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      user_is_dm: false,
      user: null,
      selected_char: null
    }
  }

  componentWillMount() {
    const { id } = this.props.computedMatch.params;

    utils.getCurrentUserInfo((success, response) => {
      const current_user = response;
      api.getGames({ id: Number(id) }, (success, response) => {
        if (success) {
          const game = response.content[0];
          if (game.owner_id === current_user.id || game.user_ids.indexOf(current_user.id) > -1)
            this.setState({ game, user_is_dm: game.owner_id === current_user.id, user: current_user });
          else
            this.setState({ game: -1 });
        }
        else
          this.setState({ game: -1 });
      });
    });
  }

  render() {
    const { game } = this.state;

    if (!game)
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <Grid stackable centered>
              <Grid.Row style={{ marginTop: '2rem' }}>
                <Grid.Column width={16}>
                  <Loader active content='Loading...' />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </InnerContainer>
        </OuterContainer>
      );

    else if (game === -1)
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <NonIdealState visual='disable' title='Game Not Found'
                           description={<span>The game you're looking for doesn't exist.</span>} />
          </InnerContainer>
        </OuterContainer>
      );

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>

          <Grid stackable centered>

            <Grid.Row verticalAlign='bottom' style={{ borderBottom: '1px solid #ccc' }}>
              <Grid.Column width={11}>
                <h2>{ game.name }</h2>
                <h6 style={{ marginBottom: '0' }}>{ game.description || 'No description' }</h6>
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                <GameCodePanel code={game.code} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={11}>
                <ChatPanel {...this.state} />
                {/*<div className='pt-card'>
                </div>*/}
              </Grid.Column>
              <Grid.Column width={5}>
                <CharactersPanel {...this.state} setRootState={this.setRootState}/>
              </Grid.Column>
            </Grid.Row>

            {
              this.state.selected_char ?
              <Grid.Row style={{ borderTop: '1px solid #ccc' }}>
                <Grid.Column width={16}>
                  <CharacterShowTabs character={this.state.selected_char} setRootState={this.setRootState} />
                </Grid.Column>
              </Grid.Row>
              : null
            }

          </Grid>

        </InnerContainer>
      </OuterContainer>
    );
  }

  setRootState = (state) => {
    // This needs to be moved to the CharacterShowTabs component and out of here and the CharacterShowPage
    if (state.character) {
      const previous = JSON.parse(JSON.stringify(this.state.selected_char));
      const current = JSON.parse(JSON.stringify(state.character));

      if (previous.proficiency_bonus !== current.proficiency_bonus ||
          previous.spell_class !== current.spell_class ||
          !_.isEqual(previous.ability_scores, current.ability_scores)) {
        this.updateSpellModifiers(current);
      }
    }

    this.setState(state);
  }

  // This needs to be moved to the CharacterShowTabs component and out of here and the CharacterShowPage
  updateSpellModifiers = (char) => {
    const { ability_scores, proficiency_bonus, spell_class } = char;

    const proficiency = Number(proficiency_bonus);
    let ability_modifier = null;
    switch(spell_class) {
      case 'Bard':
      case 'Paladin':
      case 'Sorcerer':
      case 'Warlock':
        ability_modifier = Number(ability_scores.charisma.modifier);
        break;
      case 'Cleric':
      case 'Druid':
      case 'Ranger':
        ability_modifier = Number(ability_scores.wisdom.modifier);
        break;
      case 'Wizard':
        ability_modifier = Number(ability_scores.intelligence.modifier);
        break;
      default:
        ability_modifier = 0;
        break;
    }

    if (Number.isNaN(ability_modifier))
      ability_modifier = 0;

    api.updateCharacter({
      id: char.id,
      spell_ability: ability_modifier,
      spell_save_dc: 8 + ability_modifier + proficiency,
      spell_atk_bonus: ability_modifier + proficiency
    }, (success, response) => {
      if (success)
        this.setState({ selected_char: response.content });
      else
        console.log(response);
    });
  }
}
