import React, { Component } from 'react';
import { Position, Toaster, Intent, Slider } from '@blueprintjs/core';

export default class DeathSavesSliders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: this.props.character.death_saves.success,
      failed: this.props.character.death_saves.failed
    };
  }

  render() {
    return (
      <div className='pt-form-group spellsheet-form-group'>
        <div className='pt-form-content'>
          <div className='pt-input-group' style={{ border: '1px solid rgba(16, 22, 26, 0.15)' }}>
            <div className='death-saves-slider' style={{ marginTop: '1rem' }}>
              <div style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '0.5rem' }}>Success</div>
              <div>
                <Slider initialValue={this.props.character.death_saves.success}
                        min={0} max={3} step={1} value={this.state.success}
                        onChange={(num) => this.setState({ success: num })} />
              </div>
            </div>
            <hr style={{ margin: '1rem 0' }} />
            <div className='death-saves-slider' style={{ marginBottom: '1rem' }}>
              <div style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '0.5rem' }}>Fails</div>
              <div>
                <Slider initialValue={this.props.character.death_saves.failed}
                        min={0} max={3} step={1} value={this.state.failed}
                        onChange={(num) => this.setState({ failed: num })} />
              </div>
            </div>
          </div>
          <div className='pt-form-helper-text'>
            Death Saves
          </div>
        </div>
      </div>
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

}
