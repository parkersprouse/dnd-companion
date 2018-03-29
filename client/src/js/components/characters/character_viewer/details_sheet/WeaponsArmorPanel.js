import React, { Component } from 'react';
import ArmorList from './ArmorList';
import AttunementsList from './AttunementsList';
import WeaponsList from './WeaponsList';

export default class WeaponsArmorPanel extends Component {
  render() {
    return (
      <div>
        <WeaponsList character={this.props.character} setRootState={this.props.setRootState} />
        <hr />
        <ArmorList character={this.props.character} setRootState={this.props.setRootState} />
        <hr />
        <AttunementsList character={this.props.character} setRootState={this.props.setRootState} />
      </div>
    );
  }
}
