import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class EquipmentPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row stretched>
          <Grid.Column width={16} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
