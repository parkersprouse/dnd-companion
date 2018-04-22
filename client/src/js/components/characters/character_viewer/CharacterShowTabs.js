import React, { Component } from 'react';
import { Tab2, Tabs2 } from '@blueprintjs/core';
import _ from 'lodash';
import SpellSheet from './SpellSheet';
import DetailsSheet from './DetailsSheet';
import AdditionalInfoSheet from './AdditionalInfoSheet';
import NotesSheet from './NotesSheet';
import api from '../../../lib/api';

export default class CharacterShowTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: this.props.character
    }
  }

  componentWillReceiveProps(next_props) {
    if (next_props.character)
      this.setState({ character: next_props.character });
  }

  render() {
    return (
      <Tabs2 id='CharacterTabs'>
        <Tab2 id='details' title='Details' panel={<DetailsSheet character={this.state.character} setRootState={this.setRootState} />} />
        <Tab2 id='spells' title='Spells' panel={<SpellSheet character={this.state.character} setRootState={this.setRootState} />} />
        <Tab2 id='additional' title='Additional Info' panel={<AdditionalInfoSheet character={this.state.character} setRootState={this.setRootState} />} />
        <Tab2 id='notes' title='Notes' panel={<NotesSheet character={this.state.character} setRootState={this.setRootState} />} />
        <Tabs2.Expander />
      </Tabs2>
    );
  }

  setRootState = (state) => {
    const previous = JSON.parse(JSON.stringify(this.state.character));
    const current = JSON.parse(JSON.stringify(state.character));

    if (previous.proficiency_bonus !== current.proficiency_bonus ||
        previous.spell_class !== current.spell_class ||
        !_.isEqual(previous.ability_scores, current.ability_scores)) {
      this.updateSpellModifiers(current);
    }

    this.setState(state);

    if (this.props.setRootState)
      this.props.setRootState(state);
  }

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
