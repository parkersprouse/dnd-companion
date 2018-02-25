import React, { Component } from 'react';
import InputToggler from '../../InputToggler';

export default class MoneyInputs extends Component {
  render() {
    return (
      <div>
        <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                      name='platinum' label='Platinum' number />
        <br />
        <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                      name='gold' label='Gold' number />
        <br />
        <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                      name='electrum' label='Electrum' number />
        <br />
        <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                      name='silver' label='Silver' number />
        <br />
        <InputToggler character={this.props.character} setRootState={this.props.setRootState}
                      name='copper' label='Copper' number />
      </div>
    );
  }
}
