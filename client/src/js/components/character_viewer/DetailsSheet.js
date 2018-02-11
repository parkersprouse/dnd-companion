import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import InputToggler from '../InputToggler';
import PersonalityPanel from './details_sheet/PersonalityPanel';
import HealthPanel from './details_sheet/HealthPanel';

export default class DetailsSheet extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row stretched>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <InputToggler character={this.props.character} name='name' label='Character Name' />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              details
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={5}>
            <div className='pt-card'>
              ability scores
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <HealthPanel character={this.props.character} />
            </div>
            <div className='pt-card'>
              weapons / armor
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <PersonalityPanel character={this.props.character} />
            </div>
            <div className='pt-card'>
              features & traits
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={5}>
            <div className='pt-card'>
              proficiencies and languages
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              equipment
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
