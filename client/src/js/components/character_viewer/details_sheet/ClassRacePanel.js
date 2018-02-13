import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import CustomDropdownToggler from '../../CustomDropdownToggler';
import InputToggler from '../../InputToggler';

export default class ClassRacePanel extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row stretched>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <CustomDropdownToggler character={this.props.character} api='classes' name='class' label='Class' />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <CustomDropdownToggler character={this.props.character} api='races' name='race' label='Race' />
          </Grid.Column>
          <Grid.Column width={6} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <CustomDropdownToggler character={this.props.character} filter={} api='subraces' name='subrace' label='Subrace' />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='background' label='Background' />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <CustomDropdownToggler character={this.props.character} name='alignment' label='Alignment' />
          </Grid.Column>
          <Grid.Column width={3} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='experience' label='Experience' number />
          </Grid.Column>
          <Grid.Column width={3} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='level' label='Level' number />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
