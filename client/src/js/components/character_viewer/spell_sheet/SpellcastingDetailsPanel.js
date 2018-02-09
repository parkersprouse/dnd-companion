import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import InputToggler from '../../InputToggler';

export default class SpellcastingDetailsPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='spell_ability' label='Spellcasting Ability' />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='spell_save_dc' label='Spell Save DC' />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='spell_atk_bonus' label='Spell Attack Bonus' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
