import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import AppearancePanel from './additional_info/AppearancePanel';
import TextareaToggler from '../TextareaToggler';

export default class AdditionalInfoSheet extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row stretched>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <TextareaToggler character={this.props.character} name='backstory' label='Character Backstory' />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <AppearancePanel character={this.props.character} />
            </div>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <TextareaToggler character={this.props.character} name='allies' label='Allies & Organizations' />
            </div>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <TextareaToggler character={this.props.character} name='more_features' label='Additional Features & Traits' />
            </div>
            <div className='pt-card'>
              <TextareaToggler character={this.props.character} name='treasure' label='Treasure' />
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
