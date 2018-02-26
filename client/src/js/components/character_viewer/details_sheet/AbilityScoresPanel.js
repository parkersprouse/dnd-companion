import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class AbilityScoresPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
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
