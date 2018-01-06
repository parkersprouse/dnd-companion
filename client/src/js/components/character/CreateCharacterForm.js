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
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onDropdownSelect = this.onDropdownSelect.bind(this);
  }

  onInputChange(event) {
    let value = event.target.value;
    if (event.target.type === 'checkbox')
      value = event.target.checked;
    this.setState({ [event.target.name]: value });
  }

  onDropdownSelect(changes) {
    this.setState(changes);
  }

  render() {
    console.log(this.state)
    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={6}>
            <div className='pt-card'>
              <NamePanel update={this.onInputChange} />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              <DetailsPanel update={this.onInputChange} dropdownUpdate={this.onDropdownSelect} parentState={this.state} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={6}>
            <div className='pt-card'>
              <AbilityScoresPanel update={this.onInputChange} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <LifePanel update={this.onInputChange} />
            </div>
            <div className='pt-card'>
              <AttacksPanel update={this.onInputChange} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              <PersonalityPanel update={this.onInputChange} />
            </div>
            <div className='pt-card'>
              <TraitsPanel update={this.onInputChange} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={6}>
            <div className='pt-card'>
              <ProficienciesPanel update={this.onInputChange} />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              <EquipmentPanel update={this.onInputChange} />
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
