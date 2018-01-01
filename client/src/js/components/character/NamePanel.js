import React, { Component } from 'react';
import { FormGroup } from '@blueprintjs/core';

export default class NamePanel extends Component {
  render() {
    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <label className='pt-label' for='name-input'>
          Character Name
        </label>
        <div className='pt-form-content'>
          <input id='name-input' name='name' className='pt-input' style={{ width: '100%' }} placeholder='Character Name' type='text' onChange={this.props.update} />
        </div>
      </div>
    );
  }
}
