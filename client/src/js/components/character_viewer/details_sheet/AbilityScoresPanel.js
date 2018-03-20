import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import AbilityScoreInputs from './AbilityScoreInputs';
import InputToggler from '../../InputToggler';

export default class AbilityScoresPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row stretched>
          <Grid.Column width={5}>
            <InputToggler character={this.props.character}
                          setRootState={this.props.setRootState}
                          number name='proficiency_bonus' label='Proficiency Bonus' number />
          </Grid.Column>
          <Grid.Column width={5}>
            <InputToggler character={this.props.character}
                          setRootState={this.props.setRootState}
                          number name='inspiration' label='Inspiration' number />
          </Grid.Column>
          <Grid.Column width={5}>
            <InputToggler character={this.props.character}
                          setRootState={this.props.setRootState}
                          number name='passive_wisdom' label='Passive Perception (Wisdom)' number />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column width={6}>
            <AbilityScoreInputs character={this.props.character}
                                setRootState={this.props.setRootState}/>
          </Grid.Column>
          <Grid.Column width={10}>
            scores
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
