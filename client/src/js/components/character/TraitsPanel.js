import React, { Component } from 'react';

export default class TraitsPanel extends Component {
  render() {
    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content'>
          <textarea name='traits' className='pt-input pt-fill' rows='8' onChange={this.props.update}></textarea>
          <div className='pt-form-helper-text'>Features & Traits</div>
        </div>
      </div>
    );
  }
}
