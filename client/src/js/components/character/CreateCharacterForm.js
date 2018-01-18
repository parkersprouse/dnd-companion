import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import NamePanel from './NamePanel';
import DetailsPanel from './DetailsPanel';
import AbilityScoresPanel from './AbilityScoresPanel';
import LifePanel from './LifePanel';
import AttacksPanel from './AttacksPanel';
import PersonalityPanel from './PersonalityPanel';
import TraitsPanel from './TraitsPanel';
import ProficienciesPanel from './ProficienciesPanel';
import EquipmentPanel from './EquipmentPanel';

/**
  This component will contain each of the individual components that make up
    the character creation form.
**/
export default class CreateCharacterForm extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={6}>
            <div className='pt-card'>
              <NamePanel update={this.props.onInputChange} />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              <DetailsPanel update={this.props.onInputChange} setRootState={this.props.setRootState} rootState={this.props.rootState} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={6}>
            <div className='pt-card'>
              <AbilityScoresPanel rootState={this.props.rootState} setRootState={this.props.setRootState} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <LifePanel update={this.props.onInputChange} />
            </div>
            <div className='pt-card'>
              <AttacksPanel update={this.props.onInputChange} setRootState={this.props.setRootState} rootState={this.props.rootState} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <PersonalityPanel update={this.props.onInputChange} rootState={this.props.rootState} />
            </div>
            <div className='pt-card'>
              <TraitsPanel update={this.props.onInputChange} rootState={this.props.rootState} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={6}>
            <div className='pt-card'>
              <ProficienciesPanel update={this.props.onInputChange} setRootState={this.props.setRootState} rootState={this.props.rootState} />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              <EquipmentPanel update={this.props.onInputChange} setRootState={this.props.setRootState} rootState={this.props.rootState} />
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
