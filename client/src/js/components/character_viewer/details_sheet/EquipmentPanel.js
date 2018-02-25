import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import MoneyInputs from './MoneyInputs';

export default class EquipmentPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row stretched>
          <Grid.Column width={12}>
            equipment
          </Grid.Column>
          <Grid.Column width={4}>
            <MoneyInputs character={this.props.character} setRootState={this.props.setRootState} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
