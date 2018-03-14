import React, { Component } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import _ from 'lodash';
import api from '../../../lib/api';
import ArmorTreeDisplay from './ArmorTreeDisplay';
import ArmorSelector from '../../character_creation/selectors/ArmorSelector';

export default class ArmorList extends Component {
  render() {
    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content searcher'>
          <ArmorTreeDisplay character={this.props.character}
                            content={this.props.character.armor}
                            remove={this.removeArmor}
                            setRootState={this.props.setRootState} />
          <ArmorSelector addArmor={this.addArmor} centered />
        </div>
      </div>
    );
  }

  addArmor = (arm) => {
    const armor = this.props.character.armor || [];
    if (_.find(armor, { name: arm }) !== undefined) return;
    armor.push({ name: arm, amount: 1, equipped: false, desc: '' });
    api.updateCharacter({ id: this.props.character.id, armor }, (success, response) => {
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

  removeArmor = (arm) => {
    const armor = this.props.character.armor;
    armor.splice(armor.indexOf(arm), 1);
    api.updateCharacter({ id: this.props.character.id, armor }, (success, response) => {
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
