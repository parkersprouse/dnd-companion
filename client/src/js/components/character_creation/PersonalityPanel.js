import React, { Component } from 'react';

export default class PersonalityPanel extends Component {
  render() {
    const root_state = this.props.root_state;
    let personalityRows = 2, idealsRows = 2, bondsRows = 2, flawsRows = 2;
    if (root_state) {
      if (root_state.personality) personalityRows = Math.max(root_state.personality.split('\n').length, personalityRows);
      if (root_state.ideals) idealsRows = Math.max(root_state.ideals.split('\n').length, idealsRows);
      if (root_state.bonds) bondsRows = Math.max(root_state.bonds.split('\n').length, bondsRows);
      if (root_state.flaws) flawsRows = Math.max(root_state.flaws.split('\n').length, flawsRows);
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
