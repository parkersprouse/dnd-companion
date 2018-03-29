import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import InputToggler from '../../../InputToggler';
import DeathSavesCounter from './DeathSavesCounter';

export default class HealthPanel extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row stretched>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                          name='armor_class' label='Armor Class' number />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                          name='initiative' label='Initiative' number />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                          name='speed' label='Speed' number />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                          name='max_hp' label='Max HP' number />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                          name='current_hp' label='Current HP' number />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                          name='temp_hp' label='Temporary HP' number />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                          name='hit_dice' label='Hit Dice' />
          </Grid.Column>
          <Grid.Column width={10} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <DeathSavesCounter character={this.props.character} setRootState={this.props.setRootState} />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
