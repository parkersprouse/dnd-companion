import React, { Component } from 'react';
import { Position, Toaster, Intent, Button } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import { valueify } from '../../lib/utils';
import api from '../../lib/api';
import AppearancePanel from './additional_info/AppearancePanel';

export default class AdditionalInfoSheet extends Component {
  constructor(props) {
    super(props);
    const { id, age, height, weight, eye_color, skin_color, hair_color, allies,
      treasure, backstory, more_features } = props.character;
    this.state = {
      id,
      age: valueify(age, ''),
      height: valueify(height, ''),
      weight: valueify(weight, ''),
      eye_color: valueify(eye_color, ''),
      skin_color: valueify(skin_color, ''),
      hair_color: valueify(hair_color, ''),
      allies: valueify(allies, ''),
      treasure: valueify(treasure, ''),
      backstory: valueify(backstory, ''),
      more_features: valueify(more_features, ''),
      saving: false
    };
  }

  render() {
    const backstory_rows = Math.max(this.state.backstory.split('\n').length, 8);
    const allies_rows = Math.max(this.state.allies.split('\n').length, 2);
    const more_features_rows = Math.max(this.state.more_features.split('\n').length, 2);
    const treasure_rows = Math.max(this.state.treasure.split('\n').length, 2);

    return (
      <Grid stackable centered>

        <Grid.Row style={{ marginBottom: '0', paddingBottom: '0' }}>
          <Grid.Column textAlign='right'>
            <Button intent={Intent.PRIMARY} onClick={this.save} loading={this.state.saving}>Save</Button>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={6}>
            <div className='pt-card'>
              <div className='pt-form-group' style={{ marginBottom: '0' }}>
                <div className='pt-form-content'>
                  <textarea name='backstory' className='pt-input pt-fill' rows={backstory_rows} onChange={this.onInputChange} value={this.state.backstory}></textarea>
                  <div className='pt-form-helper-text'>Character Backstory</div>
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <AppearancePanel update={this.onInputChange} root_state={this.state} />
            </div>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <div className='pt-form-group' style={{ marginBottom: '0' }}>
                <div className='pt-form-content'>
                  <textarea name='allies' className='pt-input pt-fill' rows={allies_rows} onChange={this.onInputChange} value={this.state.allies}></textarea>
                  <div className='pt-form-helper-text'>Allies & Organizations</div>
                </div>
              </div>
            </div>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <div className='pt-form-group' style={{ marginBottom: '0' }}>
                <div className='pt-form-content'>
                  <textarea name='more_features' className='pt-input pt-fill' rows={more_features_rows} onChange={this.onInputChange} value={this.state.more_features}></textarea>
                  <div className='pt-form-helper-text'>Additional Features & Traits</div>
                </div>
              </div>
            </div>
            <div className='pt-card'>
              <div className='pt-form-group' style={{ marginBottom: '0' }}>
                <div className='pt-form-content'>
                  <textarea name='treasure' className='pt-input pt-fill' rows={treasure_rows} onChange={this.onInputChange} value={this.state.treasure}></textarea>
                  <div className='pt-form-helper-text'>Treasure</div>
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  save = () => {
    this.setState({ saving: true });
    api.updateCharacter(this.state, (success) => {
      if (success)
        this.showSuccessToast();
      else
        this.showErrorToast();
      this.setState({ saving: false });
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
