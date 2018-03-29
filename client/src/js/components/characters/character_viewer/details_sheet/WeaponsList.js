import React, { Component } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import _ from 'lodash';
import api from '../../../../lib/api';
import WeaponsTreeDisplay from './WeaponsTreeDisplay';
import WeaponSelector from '../../character_creation/selectors/WeaponSelector';

export default class WeaponsList extends Component {
  render() {
    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content searcher'>
          <WeaponsTreeDisplay character={this.props.character}
                              content={this.props.character.weapons}
                              remove={this.removeWeapon}
                              setRootState={this.props.setRootState} />
          <WeaponSelector addWeapon={this.addWeapon} centered />
        </div>
      </div>
    );
  }

  addWeapon = (weapon, custom) => {
    const weapons = this.props.character.weapons || [];
    if (_.find(weapons, { name: weapon }) !== undefined) return;
    weapons.push({ name: weapon, amount: 1, equipped: false, desc: '', custom: !!custom });
    api.updateCharacter({ id: this.props.character.id, weapons }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.forceUpdate();
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        this.showErrorToast();
    });
  }

  removeWeapon = (weapon) => {
    const weapons = this.props.character.weapons;
    weapons.splice(weapons.indexOf(weapon), 1);
    api.updateCharacter({ id: this.props.character.id, weapons }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.forceUpdate();
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        this.showErrorToast();
    });
  }

  showErrorToast = () => {
    Toaster.create().show({
      message: 'Failed to update',
      position: Position.TOP_CENTER,
      intent: Intent.DANGER,
      timeout: 2000
    });
  }

  showSuccessToast = () => {
    Toaster.create().show({
      message: 'Successfully Updated',
      position: Position.TOP_CENTER,
      intent: Intent.SUCCESS,
      timeout: 2000
    });
  }
}
