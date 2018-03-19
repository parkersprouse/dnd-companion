import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import InputToggler from '../../InputToggler';

export default class AbilityScoresPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row stretched>
          <Grid.Column width={5}>
            <InputToggler character={this.props.character}
                          setRootState={this.props.setRootState}
                          number name='proficiency_bonus' label='Proficiency Bonus' />
          </Grid.Column>
          <Grid.Column width={5}>
            <InputToggler character={this.props.character}
                          setRootState={this.props.setRootState}
                          number name='inspiration' label='Inspiration' />
          </Grid.Column>
          <Grid.Column width={5}>
            <InputToggler character={this.props.character}
                          setRootState={this.props.setRootState}
                          number name='passive_wisdom' label='Passive Perception (Wisdom)' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column width={8}>
            ability
          </Grid.Column>
          <Grid.Column width={8}>
            scores
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
