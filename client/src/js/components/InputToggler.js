import React, { Component } from 'react';
import { Position, Toaster, Intent, Tooltip, InputGroup } from '@blueprintjs/core';
import { valueify } from '../lib/utils';
import api from '../lib/api';

export default class InputToggler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      saving: false,
      [props.name]: valueify(props.character[props.name], '')
    }
  }

  render() {
    if (this.state.editing)
      return (
        <div className='pt-form-group spellsheet-form-group'>
          <div className='pt-form-content'>
            <div className='pt-input-group'>
              <InputGroup
                value={this.state[this.props.name]}
                placeholder=''
                type={this.props.number ? 'number' : 'text'}
                onChange={(event) => this.setState({ [this.props.name]: event.target.value }) }
                rightElement={<Tooltip content='Save' position={Position.TOP}>
                                <button className='pt-button pt-minimal pt-intent-success pt-icon-tick' onClick={this.save}></button>
                              </Tooltip>}
              />
            </div>
            <div className='pt-form-helper-text'>
              {this.props.label}
            </div>
          </div>
        </div>
      );

    return (
      <div className='pt-form-group spellsheet-form-group'>
        <div className='pt-form-content'>
          <div className='pt-input-group'>
            <Tooltip content='Click to edit' position={Position.TOP}>
              <span className='char-sheet-editable-text' onClick={() => this.setEditing(true)}>
                { this.state[this.props.name] !== null &&
                  this.state[this.props.name] !== '' ?
                  this.state[this.props.name] : this.props.number ? '0' : 'None' }
              </span>
            </Tooltip>
          </div>
          <div className='pt-form-helper-text'>
            {this.props.label}
          </div>
        </div>
      </div>
    );
  }

  save = () => {
    this.setState({ saving: true });
    api.updateCharacter({ id: this.props.character.id, [this.props.name]: this.state[this.props.name] }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.setEditing(false);
      }
      else
        this.showErrorToast();
      this.setState({ saving: false });
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
