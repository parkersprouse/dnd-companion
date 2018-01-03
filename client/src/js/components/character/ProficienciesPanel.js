import React, { Component } from 'react';

export default class ProficienciesPanel extends Component {
  render() {
    return (
      <div>
        <div className='pt-form-group' style={{ marginBottom: '0' }}>
          <div className='pt-form-content'>
            <textarea name='proficiencies' className='pt-input pt-fill' rows='3' onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Proficiencies</div>
          </div>
        </div>
        <div className='pt-form-group' style={{ marginBottom: '0', marginTop: '1rem' }}>
          <div className='pt-form-content'>
            <textarea name='languages' className='pt-input pt-fill' rows='3' onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Languages</div>
          </div>
        </div>
      </div>
    );
  }
}
