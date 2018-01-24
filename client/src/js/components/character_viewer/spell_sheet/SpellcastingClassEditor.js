import React, { Component } from 'react';
import { Tooltip, Position, InputGroup, Toaster, Intent } from '@blueprintjs/core';
import axios from 'axios';
import constants from '../../../lib/constants';

export default class SpellSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      spell_class: props.spell_class || '',
      new_spell_class: props.spell_class || ''
    }
  }

  render() {
    return (
      <div className='pt-form-group spellsheet-form-group'>
        <div className='pt-form-content'>
          <div className='pt-input-group'>
            { this.renderClassDisplay() }
          </div>
          <div className='pt-form-helper-text'>
            Spellcasting Class
          </div>
        </div>
      </div>
    );
  }

  renderClassDisplay = () => {
    if (this.state.editing)
      return (
        <InputGroup
          value={this.state.new_spell_class}
          placeholder='Enter Spellcasting Class'
          type='text'
          onChange={(event) => this.setState({ new_spell_class: event.target.value }) }
          rightElement={<Tooltip content='Save' position={Position.TOP}>
                          <button className='pt-button pt-minimal pt-intent-success pt-icon-tick' onClick={this.save}></button>
                        </Tooltip>}
        />
      );

    return (
      <Tooltip content='Click to edit' position={Position.TOP}>
        <span style={{ fontWeight: 'bold' }} onClick={() => this.setEditing(true)}>
          { this.state.spell_class || 'None' }
        </span>
      </Tooltip>
    );
  }

  save = () => {
    axios.patch('/api/characters/update', { id: this.props.id, spell_class: this.state.new_spell_class })
      .then((response) => {
        if (response.status === constants.http_ok) {
          this.setState({ editing: false, spell_class: this.state.new_spell_class });
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
    this.setState({ editing });
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

}
