import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { Tab2, Tabs2, Button, Intent, Toaster, Alert, Position, NonIdealState } from '@blueprintjs/core';
import _ from 'lodash';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import api from '../lib/api';
import utils from '../lib/utils';
import validator from 'validator';
import SpellSheet from '../components/character_viewer/SpellSheet';
import DetailsSheet from '../components/character_viewer/DetailsSheet';
import AdditionalInfoSheet from '../components/character_viewer/AdditionalInfoSheet';
import NotesSheet from '../components/character_viewer/NotesSheet';

export default class CharacterShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      show_delete_alert: false
    };
  }

  componentWillMount() {
    const { id } = this.props.computedMatch.params;

    if (!validator.isInt(id))
      this.setState({ character: -1 });
    else
      utils.getCurrentUserInfo((loggedIn, res) => {
        api.getCharacter({ id: Number(id), userid: Number(res.id) }, (success, response) => {
          if (success)
            this.setState({ character: response.content[0] });
          else
            this.setState({ character: -1 });
        });
      });
  }

  render() {
    if (!this.state.character)
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

    else if (this.state.character === -1)
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <NonIdealState visual='disable' title='Character Not Found'
                           description={<span>The character you're looking for doesn't exist.</span>} />
          </InnerContainer>
        </OuterContainer>
      );

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <Tabs2 id='CharacterTabs'>
            <Tab2 id='details' title='Details' panel={<DetailsSheet character={this.state.character} setRootState={this.setRootState} />} />
            <Tab2 id='spells' title='Spells' panel={<SpellSheet character={this.state.character} setRootState={this.setRootState} />} />
            <Tab2 id='additional' title='Additional Info' panel={<AdditionalInfoSheet character={this.state.character} setRootState={this.setRootState} />} />
            <Tab2 id='notes' title='Notes' panel={<NotesSheet character={this.state.character} setRootState={this.setRootState} />} />
            <Tabs2.Expander />
          </Tabs2>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button intent={Intent.DANGER} className='pt-minimal'
                    onClick={() => this.setState({ show_delete_alert: true })}>Delete</Button>
          </div>
          { this.renderConfirmDeleteAlert() }
        </InnerContainer>
      </OuterContainer>
    );
  }

  renderConfirmDeleteAlert = () => {
    return (
      <Alert
        intent={Intent.DANGER}
        isOpen={this.state.show_delete_alert}
        confirmButtonText='Delete'
        cancelButtonText='Cancel'
        onConfirm={this.handleDelete}
        onCancel={this.handleClose}
      >
        <p className='no-icon'>Are you sure you want to delete this character?</p>
        <p>This cannot be undone.</p>
      </Alert>
    );
  }

  handleDelete = () => {
    api.deleteCharacter(this.state.character.id, (success, response) => {
      if (success) {
        window.location.href = '/characters';
      }
      else {
        Toaster.create().show({
          message: 'Failed to delete',
          position: Position.TOP_CENTER,
          intent: Intent.DANGER,
          timeout: 2000
        });
      }
    });
  }

  handleClose = () => {
    this.setState({ show_delete_alert: !this.state.show_delete_alert })
  }

  setRootState = (state) => {
    // The best way to freeze an object in time is the following
    const previous = JSON.parse(JSON.stringify(this.state.character));
    const current = JSON.parse(JSON.stringify(state.character));

    if (previous.proficiency_bonus !== current.proficiency_bonus ||
        previous.spell_class !== current.spell_class ||
        !_.isEqual(previous.ability_scores, current.ability_scores)) {
      this.updateSpellModifiers(current);
    }

    this.setState(state);
  }

  // Whenever our proficiency bonus, ability modifiers, or spellcasting class
  // changes, our spellcasting modifiers need to be updated.
  // This handles that.
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
        this.setState({ character: response.content });
      else
        console.log(response);
    });
  }
}
