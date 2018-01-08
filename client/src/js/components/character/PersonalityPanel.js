import React, { Component } from 'react';

export default class PersonalityPanel extends Component {
  render() {
    const rootState = this.props.rootState;
    let personalityRows = 2, idealsRows = 2, bondsRows = 2, flawsRows = 2;
    if (rootState) {
      if (rootState.personality) personalityRows = Math.max(rootState.personality.split('\n').length, personalityRows);
      if (rootState.ideals) idealsRows = Math.max(rootState.ideals.split('\n').length, idealsRows);
      if (rootState.bonds) bondsRows = Math.max(rootState.bonds.split('\n').length, bondsRows);
      if (rootState.flaws) flawsRows = Math.max(rootState.flaws.split('\n').length, flawsRows);
    }
    return (
      <div>
        <div className='pt-form-group' style={{ marginBottom: '0' }}>
          <div className='pt-form-content'>
            <textarea name='personality' className='pt-input pt-fill' rows={personalityRows} onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Personality Traits</div>
          </div>
        </div>
        <div className='pt-form-group' style={{ marginBottom: '0', marginTop: '1rem' }}>
          <div className='pt-form-content'>
            <textarea name='ideals' className='pt-input pt-fill' rows={idealsRows} onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Ideals</div>
          </div>
        </div>
        <div className='pt-form-group' style={{ marginBottom: '0', marginTop: '1rem' }}>
          <div className='pt-form-content'>
            <textarea name='bonds' className='pt-input pt-fill' rows={bondsRows} onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Bonds</div>
          </div>
        </div>
        <div className='pt-form-group' style={{ marginBottom: '0', marginTop: '1rem' }}>
          <div className='pt-form-content'>
            <textarea name='flaws' className='pt-input pt-fill' rows={flawsRows} onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Flaws</div>
          </div>
        </div>
      </div>
    );
  }
}
