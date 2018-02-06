import React, { Component } from 'react';

export default class NamePanel extends Component {
  render() {
    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content'>
          <input name='name' className='pt-input pt-fill' type='text' onChange={this.props.update} />
          <div className="pt-form-helper-text">Character Name <span className='required-label no-icon'>*</span></div>
        </div>
      </div>
    );
  }
}
