import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class DetailsPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column style={{ width: 'initial' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <label className='pt-label' for='class-input'>
                Class
              </label>
              <div className='pt-form-content'>
                <input id='class-input' name='class' className='pt-input' style={{ width: '100%' }} placeholder='Class' type='text' onChange={this.props.update} />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column style={{ width: 'initial' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <label className='pt-label' for='background-input'>
                Background
              </label>
              <div className='pt-form-content'>
                <input id='background-input' name='background' className='pt-input' style={{ width: '100%' }} placeholder='Background' type='text' onChange={this.props.update} />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column style={{ width: 'initial' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <label className='pt-label' for='player-input'>
                Player Name
              </label>
              <div className='pt-form-content'>
                <input id='player-input' name='player' className='pt-input' style={{ width: '100%' }} placeholder='Player Name' type='text' onChange={this.props.update} />
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column style={{ width: 'initial' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <label className='pt-label' for='race-input'>
                Race
              </label>
              <div className='pt-form-content'>
                <input id='race-input' name='race' className='pt-input' style={{ width: '100%' }} placeholder='Race' type='text' onChange={this.props.update} />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column style={{ width: 'initial' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <label className='pt-label' for='alignment-input'>
                Alignment
              </label>
              <div className='pt-form-content'>
                <input id='alignment-input' name='alignment' className='pt-input' style={{ width: '100%' }} placeholder='Alignment' type='text' onChange={this.props.update} />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column style={{ width: 'initial' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <label className='pt-label' for='exp-input'>
                Exp. / Level
              </label>
              <div className='pt-form-content'>
                <input id='exp-input' name='exp' className='pt-input' style={{ width: '100%' }} placeholder='Exp. / Level' type='text' onChange={this.props.update} />
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
