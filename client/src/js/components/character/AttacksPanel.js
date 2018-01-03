import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class AttacksPanel extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={6} style={{ paddingRight: '0' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='weaponA' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Weapon Name</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={4} style={{ paddingRight: '0' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='atkbonusA' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Atk Bonus</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='damageA' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Damage</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{ paddingTop: '0' }}>
          <Grid.Column width={6} style={{ paddingRight: '0' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='weaponB' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Weapon Name</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={4} style={{ paddingRight: '0' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='atkbonusB' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Atk Bonus</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='damageB' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Damage</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{ paddingTop: '0' }}>
          <Grid.Column width={6} style={{ paddingRight: '0' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='weaponC' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Weapon Name</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={4} style={{ paddingRight: '0' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='atkbonusC' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Atk Bonus</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='damageC' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Damage</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{ paddingTop: '0' }}>
          <Grid.Column width={16}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <textarea name='extraweapons' className='pt-input pt-fill' rows='8' onChange={this.props.update}></textarea>
                <div className='pt-form-helper-text'>Extra Weapons</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
