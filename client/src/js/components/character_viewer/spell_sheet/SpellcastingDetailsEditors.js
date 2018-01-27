import React, { Component } from 'react';
import { Tooltip, Position, InputGroup, Toaster, Intent } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import constants from '../../../lib/constants';

export default class SpellcastingDetailsEditors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing_spell_ability: false,
      spell_ability: props.character.spell_ability,
      new_spell_ability: props.character.spell_ability,

      editing_spell_save_dc: false,
      spell_save_dc: props.character.spell_save_dc,
      new_spell_save_dc: props.character.spell_save_dc,

      editing_spell_atk_bonus: false,
      spell_atk_bonus: props.character.spell_atk_bonus,
      new_spell_atk_bonus: props.character.spell_atk_bonus
    }
  }

  render() {
    return (
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column width={5} style={{ paddingRight: '0.5rem' }}>
            <div className='pt-form-group spellsheet-form-group'>
              <div className='pt-form-content'>
                <div className='pt-input-group'>
                  {
                    this.renderDisplay({
                      editing: 'editing_spell_ability',
                      current: 'new_spell_ability',
                      initial: 'spell_ability'
                    })
                  }
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
                  {
                    this.renderDisplay({
                      editing: 'editing_spell_save_dc',
                      current: 'new_spell_save_dc',
                      initial: 'spell_save_dc'
                    })
                  }
                </div>
                <div className='pt-form-helper-text'>
                  Spell Save DC
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem' }}>
            <div className='pt-form-group spellsheet-form-group'>
              <div className='pt-form-content'>
                <div className='pt-input-group'>
                  {
                    this.renderDisplay({
                      editing: 'editing_spell_atk_bonus',
                      current: 'new_spell_atk_bonus',
                      initial: 'spell_atk_bonus'
                    })
                  }
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

  showErrorToast = () => {
    Toaster.create().show({
        message: 'Failed to update',
        position: Position.TOP_CENTER,
        intent: Intent.DANGER,
        timeout: 2000
    });
  }

  showSuccessToast = () => {
    Toaster.create().show({
        message: 'Successfully Updated',
        position: Position.TOP_CENTER,
        intent: Intent.SUCCESS,
        timeout: 2000
    });
  }


  renderDisplay = ({ editing, current, initial }) => {
    if (this.state[editing])
      return (
        <InputGroup
          value={this.state[current]} type='text'
          onChange={(event) => this.setState({ [current]: event.target.value }) }
          rightElement={<Tooltip content='Save' position={Position.TOP}>
                          <button className='pt-button pt-minimal pt-intent-success pt-icon-tick'
                                  onClick={() => this.save({ editing, current, initial })}></button>
                        </Tooltip>}
        />
      );

    return (
      <Tooltip content='Click to edit' position={Position.TOP}>
        <span className='char-sheet-editable-text' onClick={() => this.setEditing({ [editing]: true })}>
          { this.state[initial] !== null && this.state[initial] !== '' ? this.state[initial] : 'None' }
        </span>
      </Tooltip>
    );
  }

  save = ({ editing, current, initial }) => {
    axios.patch(constants.server + '/api/characters/update', { id: this.props.character.id, [initial]: this.state[current] })
      .then((response) => {
        if (response.status === constants.http_ok) {
          this.setState({ [editing]: false, [initial]: this.state[current] });
          this.showSuccessToast();
        }
        else {
          this.showErrorToast();
        }
      })
      .catch((error) => {
        this.showErrorToast();
      });
  }

  setEditing = (editing) => {
    this.setState(editing);
  }

}
