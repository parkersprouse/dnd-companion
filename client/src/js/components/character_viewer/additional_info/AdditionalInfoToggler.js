import React, { Component } from 'react';
import { valueify } from '../../../lib/utils';
import api from '../../../lib/api';
import { Position, Toaster, Intent, Button, Tooltip } from '@blueprintjs/core';

export default class AdditionalInfoToggler extends Component {
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
        <div>
          <div className='pt-form-group' style={{ marginBottom: '0' }}>
            <div className='pt-form-content'>
              <textarea name={this.props.name} className='pt-input pt-fill' rows={4} onChange={this.onInputChange} value={this.state[this.props.name]}></textarea>
              <div className='pt-form-helper-text'>{this.props.label}</div>
            </div>
          </div>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Button intent={Intent.PRIMARY} onClick={this.save} loading={this.state.saving}>Save</Button>
          </div>
        </div>
      );

    return (
      <Tooltip content='Click to edit' position={Position.TOP}>
        <div className='pt-form-group' style={{ marginBottom: '0' }}>
          <div className='pt-form-content'>
            <div className='pt-input-group' style={{ whiteSpace: 'pre-wrap', cursor: 'pointer' }} onClick={() => this.setEditing(true)}>
              { this.state[this.props.name] !== null && this.state[this.props.name] !== '' ? this.state[this.props.name] : 'None. Click to edit.' }
            </div>
            <div className='pt-form-helper-text' style={{ marginTop: '1.5rem' }}>{this.props.label}</div>
          </div>
        </div>
      </Tooltip>
    );
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  save = () => {
    this.setState({ saving: true });
    api.updateCharacter({ id: this.props.character.id, [this.props.name]: this.state[this.props.name] }, (success) => {
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
