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
  }

  onInputChange(event) {
    let value = event.target.value;
    if (event.target.type === 'checkbox')
      value = event.target.checked;
    this.setState({ [event.target.name]: value });
  }

  render() {
    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={6}>
            <Segment>
              <NamePanel update={this.onInputChange} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>
              <DetailsPanel update={this.onInputChange} />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={6}>
            <Segment>
              <AbilityScoresPanel update={this.onInputChange} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment>
              <LifePanel update={this.onInputChange} />
            </Segment>
            <Segment>
              <AttacksPanel update={this.onInputChange} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment>
              <PersonalityPanel update={this.onInputChange} />
            </Segment>
            <Segment>
              <TraitsPanel update={this.onInputChange} />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={6}>
            <Segment>
              <ProficienciesPanel update={this.onInputChange} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>
              <EquipmentPanel update={this.onInputChange} />
            </Segment>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
