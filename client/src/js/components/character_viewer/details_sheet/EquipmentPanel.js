import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EquipmentList from './EquipmentList';
import MoneyInputs from './MoneyInputs';

export default class EquipmentPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row stretched>
          <Grid.Column width={8}>
            <EquipmentList character={this.props.character} setRootState={this.props.setRootState} />
          </Grid.Column>
          <Grid.Column width={8}>
            <MoneyInputs character={this.props.character} setRootState={this.props.setRootState} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
