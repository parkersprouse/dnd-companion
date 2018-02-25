import React, { Component } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import api from '../../../lib/api';

export default class DeathSavesCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: this.props.character.death_saves.success,
      failed: this.props.character.death_saves.failed
    };
  }

  render() {
    return (
      <div>
        <div className='pt-form-group spellsheet-form-group' style={{ paddingBottom: '2rem' }}>
          <div className='pt-form-content'>
            <div className='pt-input-group'>
              <label className='pt-control pt-checkbox pt-inline death-save-input'>
                <input type='checkbox' checked={this.state.success === 1} onChange={(event) => this.handleToggle(event, 'success', 1)} />
                <span className='pt-control-indicator death-save-one'></span>
              </label>
              <label className='pt-control pt-checkbox pt-inline death-save-input'>
                <input type='checkbox' checked={this.state.success === 2} onChange={(event) => this.handleToggle(event, 'success', 2)} />
                <span className='pt-control-indicator death-save-two'></span>
              </label>
              <label className='pt-control pt-checkbox pt-inline death-save-input'>
                <input type='checkbox' checked={this.state.success === 3} onChange={(event) => this.handleToggle(event, 'success', 3)} />
                <span className='pt-control-indicator death-save-three'></span>
              </label>
            </div>
            <div className='pt-form-helper-text'>
              Successful Death Saves
            </div>
          </div>
        </div>

        <div className='pt-form-group spellsheet-form-group'>
          <div className='pt-form-content'>
            <div className='pt-input-group'>
              <label className='pt-control pt-checkbox pt-inline death-save-input'>
                <input type='checkbox' checked={this.state.failed === 1} onChange={(event) => this.handleToggle(event, 'failed', 1)} />
                <span className='pt-control-indicator death-save-one'></span>
              </label>
              <label className='pt-control pt-checkbox pt-inline death-save-input'>
                <input type='checkbox' checked={this.state.failed === 2} onChange={(event) => this.handleToggle(event, 'failed', 2)} />
                <span className='pt-control-indicator death-save-two'></span>
              </label>
              <label className='pt-control pt-checkbox pt-inline death-save-input'>
                <input type='checkbox' checked={this.state.failed === 3} onChange={(event) => this.handleToggle(event, 'failed', 3)} />
                <span className='pt-control-indicator death-save-three'></span>
              </label>
            </div>
            <div className='pt-form-helper-text'>
              Failed Death Saves
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleToggle = (event, name, value) => {
    // I'm so sorry about this
    const death_saves = {
      success: name === 'success' ? event.target.checked ? value : 0 : this.state.success,
      failed: name === 'failed' ? event.target.checked ? value : 0 : this.state.failed
    }

    api.updateCharacter({ id: this.props.character.id, death_saves }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.setState({
          success: death_saves.success,
          failed: death_saves.failed
        });
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        this.showErrorToast();
    });
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
