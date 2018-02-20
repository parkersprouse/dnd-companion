import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Tooltip, Position } from '@blueprintjs/core';
import InputToggler from '../../InputToggler';

export default class SpellcastingDetailsPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <div className='pt-form-group spellsheet-form-group'>
              <div className='pt-form-content'>
                <div className='pt-input-group'>
                  <Tooltip content='spellcasting ability modifier' position={Position.TOP}>
                    <span className='char-sheet-editable-text'>
                      { this.props.character.spell_ability || '0' }
                    </span>
                  </Tooltip>
                </div>
                <div className='pt-form-helper-text'>
                  Spellcasting Ability
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <div className='pt-form-group spellsheet-form-group'>
              <div className='pt-form-content'>
                <div className='pt-input-group'>
                  <Tooltip content='8 + spellcasting ability modifier + proficiency bonus' position={Position.TOP}>
                    <span className='char-sheet-editable-text'>
                      { this.props.character.spell_save_dc || '0' }
                    </span>
                  </Tooltip>
                </div>
                <div className='pt-form-helper-text'>
                  Spell Save DC
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <div className='pt-form-group spellsheet-form-group'>
              <div className='pt-form-content'>
                <div className='pt-input-group'>
                  <Tooltip content='spellcasting ability modifier + proficiency bonus' position={Position.TOP}>
                    <span className='char-sheet-editable-text'>
                      { this.props.character.spell_atk_bonus || '0' }
                    </span>
                  </Tooltip>
                </div>
                <div className='pt-form-helper-text'>
                  Spell Attack Bonus
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
