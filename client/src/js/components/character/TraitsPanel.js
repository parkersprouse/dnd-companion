import React, { Component } from 'react';

export default class TraitsPanel extends Component {
  render() {
    const rootState = this.props.rootState;
    let rows = 8;
    if (rootState && rootState.traits) rows = Math.max(rootState.traits.split('\n').length, rows);
    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content'>
          <textarea name='traits' className='pt-input pt-fill' rows={rows} onChange={this.props.update}></textarea>
          <div className='pt-form-helper-text'>Features & Traits</div>
        </div>
      </div>
    );
  }
}
