import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class EquipmentPanel extends Component {
  render() {
    return (
      <Grid stackable centered verticalAlign='middle'>

        <Grid.Row>
          <Grid.Column width={10}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <textarea name='equipment' className='pt-input pt-fill' rows='8' onChange={this.props.update}></textarea>
                <div className='pt-form-helper-text'>Equipment</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='weaponA' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Weapon Name</div>
              </div>
            </div>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='weaponA' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Weapon Name</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>

    );
  }
}
