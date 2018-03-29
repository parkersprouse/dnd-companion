import React, { Component } from 'react';
import InputToggler from '../../../InputToggler';

export default class MoneyInputs extends Component {
  render() {
    return (
      <div style={{ maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
        <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                      name='platinum' label='Platinum' style={{ paddingBottom: '1.5rem' }} number />
        <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                      name='gold' label='Gold' style={{ paddingBottom: '1.5rem' }} number />
        <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                      name='electrum' label='Electrum' style={{ paddingBottom: '1.5rem' }} number />
        <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                      name='silver' label='Silver' style={{ paddingBottom: '1.5rem' }} number />
        <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                      name='copper' label='Copper' number />
      </div>
    );
  }
}
