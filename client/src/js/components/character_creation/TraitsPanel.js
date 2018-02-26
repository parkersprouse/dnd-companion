import React, { Component } from 'react';

export default class TraitsPanel extends Component {
  render() {
    const root_state = this.props.root_state;
    let rows = 8;
    if (root_state && root_state.features) rows = Math.max(root_state.features.split('\n').length, rows);
    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content'>
          <textarea name='features' className='pt-input pt-fill' rows={rows} onChange={this.props.update}></textarea>
          <div className='pt-form-helper-text'>Features & Traits</div>
        </div>
      </div>
    );
  }
}
