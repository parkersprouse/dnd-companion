import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import InputToggler from '../../InputToggler';

export default class AppearancePanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='age' label='Age' />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='height' label='Height' />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='weight' label='Weight' />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='eye_color' label='Eyes' />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='skin_color' label='Skin' />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='hair_color' label='Hair' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
