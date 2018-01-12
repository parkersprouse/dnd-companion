import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ClassSelector from './selectors/ClassSelector';
import RaceSelector from './selectors/RaceSelector';
import AlignmentSelector from './selectors/AlignmentSelector';

export default class DetailsPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column width={5} style={{ paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content searcher'>
                <ClassSelector update={this.props.update} setRootState={this.props.setRootState} rootState={this.props.rootState} />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='background' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Background</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={6} style={{ paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='player_name' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Player Name</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5} style={{ paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content searcher'>
                <RaceSelector update={this.props.update} setRootState={this.props.setRootState} rootState={this.props.rootState} />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content searcher'>
                <AlignmentSelector update={this.props.update} setRootState={this.props.setRootState} rootState={this.props.rootState} />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={3} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='experience' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Experience</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={3} style={{ paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='level' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Level</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
