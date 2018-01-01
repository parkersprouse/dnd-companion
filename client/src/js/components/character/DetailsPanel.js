import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class DetailsPanel extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column width={5} style={{ paddingRight: '0' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='class' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Class</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingRight: '0' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='background' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Background</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='player' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Player Name</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{ paddingTop: '0' }}>
          <Grid.Column width={5} style={{ paddingRight: '0' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='race' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Race</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingRight: '0' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <div className='pt-select pt-fill'>
                  <select name='alignment' onChange={this.props.update} defaultValue='0'>
                    <option disabled value='0'>Choose Alignment</option>
                    <option value='1'>Lawful Good</option>
                    <option value='2'>Lawful Neutral</option>
                    <option value='3'>Lawful Evil</option>
                    <option value='4'>True Neutral</option>
                    <option value='5'>Chaotic Good</option>
                    <option value='6'>Chaotic Neutral</option>
                    <option value='7'>Chaotic Evil</option>
                  </select>
                </div>
                <div className='pt-form-helper-text'>Alignment</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={3} style={{ paddingRight: '0' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <input name='experience' className='pt-input pt-fill' type='text' onChange={this.props.update} />
                <div className='pt-form-helper-text'>Experience</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={3}>
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
