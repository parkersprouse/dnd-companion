import React, { Component } from 'react';

export default class PersonalityPanel extends Component {
  render() {
    return (
      <div>
        <div className='pt-form-group' style={{ marginBottom: '0' }}>
          <div className='pt-form-content'>
            <textarea name='personality' className='pt-input pt-fill' rows='2' onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Personality Traits</div>
          </div>
        </div>
        <div className='pt-form-group' style={{ marginBottom: '0', marginTop: '1rem' }}>
          <div className='pt-form-content'>
            <textarea name='ideals' className='pt-input pt-fill' rows='2' onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Ideals</div>
          </div>
        </div>
        <div className='pt-form-group' style={{ marginBottom: '0', marginTop: '1rem' }}>
          <div className='pt-form-content'>
            <textarea name='bonds' className='pt-input pt-fill' rows='2' onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Bonds</div>
          </div>
        </div>
        <div className='pt-form-group' style={{ marginBottom: '0', marginTop: '1rem' }}>
          <div className='pt-form-content'>
            <textarea name='flaws' className='pt-input pt-fill' rows='2' onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Flaws</div>
          </div>
        </div>
      </div>
    );
  }
}
