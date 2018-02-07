import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class DetailsPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column width={5} style={{ paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='age' className='pt-input pt-fill' type='text' onChange={this.props.update} value={this.props.root_state.age} />
                <div className='pt-form-helper-text'>Age</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='height' className='pt-input pt-fill' type='text' onChange={this.props.update} value={this.props.root_state.height} />
                <div className='pt-form-helper-text'>Height</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='weight' className='pt-input pt-fill' type='text' onChange={this.props.update} value={this.props.root_state.weight} />
                <div className='pt-form-helper-text'>Weight</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5} style={{ paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='eye_color' className='pt-input pt-fill' type='text' onChange={this.props.update} value={this.props.root_state.eye_color} />
                <div className='pt-form-helper-text'>Eyes</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='skin_color' className='pt-input pt-fill' type='text' onChange={this.props.update} value={this.props.root_state.skin_color} />
                <div className='pt-form-helper-text'>Skin</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='hair_color' className='pt-input pt-fill' type='text' onChange={this.props.update} value={this.props.root_state.hair_color} />
                <div className='pt-form-helper-text'>Hair</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
