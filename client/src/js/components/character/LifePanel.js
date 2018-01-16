import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class LifePanel extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={8} style={{ paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='armor_class' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Armor Class</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={8} style={{ paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='speed' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Speed</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8} style={{ paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='max_hp' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Max Hit Points</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={8} style={{ paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='hit_dice' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Hit Dice</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
