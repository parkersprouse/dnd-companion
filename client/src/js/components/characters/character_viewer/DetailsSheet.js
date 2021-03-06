import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import InputToggler from '../../InputToggler';
import TextareaToggler from '../../TextareaToggler';
import AbilityScoresPanel from './details_sheet/AbilityScoresPanel';
import ClassRacePanel from './details_sheet/ClassRacePanel';
import EquipmentPanel from './details_sheet/EquipmentPanel';
import HealthPanel from './details_sheet/HealthPanel';
import PersonalityPanel from './details_sheet/PersonalityPanel';
import ProficienciesLanguagesPanel from './details_sheet/ProficienciesLanguagesPanel';
import WeaponsArmorPanel from './details_sheet/WeaponsArmorPanel';

export default class DetailsSheet extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row stretched>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                            name='name' label='Character Name' className='col-vertical-center' />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              <ClassRacePanel character={this.props.character} setRootState={this.props.setRootState} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <AbilityScoresPanel character={this.props.character} setRootState={this.props.setRootState} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <HealthPanel character={this.props.character} setRootState={this.props.setRootState} />
            </div>
            <div className='pt-card'>
              <WeaponsArmorPanel character={this.props.character} setRootState={this.props.setRootState} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <PersonalityPanel character={this.props.character} setRootState={this.props.setRootState} />
            </div>
            <div className='pt-card'>
              <TextareaToggler character={this.props.character} setRootState={this.props.setRootState}
                               rows={8} name='features' label='Features & Traits' />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <ProficienciesLanguagesPanel character={this.props.character} setRootState={this.props.setRootState} />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              <EquipmentPanel character={this.props.character} setRootState={this.props.setRootState} />
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
