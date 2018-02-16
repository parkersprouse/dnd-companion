import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import InputToggler from '../InputToggler';
import TextareaToggler from '../TextareaToggler';
import PersonalityPanel from './details_sheet/PersonalityPanel';
import HealthPanel from './details_sheet/HealthPanel';
import ClassRacePanel from './details_sheet/ClassRacePanel';
import ProficienciesLanguagesPanel from './details_sheet/ProficienciesLanguagesPanel';

export default class DetailsSheet extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <InputToggler character={this.props.character} name='name' label='Character Name' />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              <ClassRacePanel character={this.props.character} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
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
              <TextareaToggler character={this.props.character} rows={8} name='features' label='Features & Traits' />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <ProficienciesLanguagesPanel character={this.props.character} />
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
