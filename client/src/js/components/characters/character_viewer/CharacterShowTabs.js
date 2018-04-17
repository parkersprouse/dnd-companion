import React, { Component } from 'react';
import { Tab2, Tabs2 } from '@blueprintjs/core';
import SpellSheet from './SpellSheet';
import DetailsSheet from './DetailsSheet';
import AdditionalInfoSheet from './AdditionalInfoSheet';
import NotesSheet from './NotesSheet';

export default class CharacterShowTabs extends Component {
  render() {
    return (
      <Tabs2 id='CharacterTabs'>
        <Tab2 id='details' title='Details' panel={<DetailsSheet character={this.props.character} setRootState={this.props.setRootState} />} />
        <Tab2 id='spells' title='Spells' panel={<SpellSheet character={this.props.character} setRootState={this.props.setRootState} />} />
        <Tab2 id='additional' title='Additional Info' panel={<AdditionalInfoSheet character={this.props.character} setRootState={this.props.setRootState} />} />
        <Tab2 id='notes' title='Notes' panel={<NotesSheet character={this.props.character} setRootState={this.props.setRootState} />} />
        <Tabs2.Expander />
      </Tabs2>
    );
  }
}
