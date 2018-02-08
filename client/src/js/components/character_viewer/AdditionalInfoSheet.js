import React, { Component } from 'react';
import { Position, Toaster, Intent, Button } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import { valueify } from '../../lib/utils';
import api from '../../lib/api';
import AppearancePanel from './additional_info/AppearancePanel';
import AdditionalInfoToggler from './additional_info/AdditionalInfoToggler';

export default class AdditionalInfoSheet extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row stretched>
          <Grid.Column width={6}>
            <div className='pt-card'>
              <AdditionalInfoToggler character={this.props.character} name='backstory' label='Character Backstory' />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              {/* <AppearancePanel update={this.onInputChange} root_state={this.state} /> */}
            </div>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <AdditionalInfoToggler character={this.props.character} name='allies' label='Allies & Organizations' />
            </div>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <AdditionalInfoToggler character={this.props.character} name='more_features' label='Additional Features & Traits' />
            </div>
            <div className='pt-card'>
              <AdditionalInfoToggler character={this.props.character} name='treasure' label='Treasure' />
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
