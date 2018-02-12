import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import InputToggler from '../../InputToggler';
import DeathSavesSliders from './DeathSavesSliders';

export default class HealthPanel extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row stretched>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='armor_class' label='Armor Class' number />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='initiative' label='Initiative' number />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='speed' label='Speed' number />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='max_hp' label='Max HP' number />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='current_hp' label='Current HP' number />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='temp_hp' label='Temporary HP' number />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character} name='hit_dice' label='Hit Dice' />
          </Grid.Column>
          <Grid.Column width={10} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            death saves are difficult
            {/*<DeathSavesSliders character={this.props.character} />*/}
            {/*<RadioGroup inline>
                <Radio label={null} value="one" />
                <Radio label={null} value="two" />
                <Radio label={null} value="three" />
                <Radio label={null} value="three" />
            </RadioGroup>*/}
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}