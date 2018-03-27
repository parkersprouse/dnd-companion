import React, { Component } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import _ from 'lodash';
import api from '../../../lib/api';
//import WeaponsTreeDisplay from './WeaponsTreeDisplay';
//import WeaponSelector from '../../character_creation/selectors/WeaponSelector';

export default class AttunementsList extends Component {
  render() {
    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content searcher'>
          Attunements
          {/* <WeaponsTreeDisplay character={this.props.character}
                              content={this.props.character.attunements}
                              remove={this.removeAttunement}
                              setRootState={this.props.setRootState} />
          <WeaponSelector addAttunement={this.addAttunement} centered /> */}
        </div>
      </div>
    );
  }

  addAttunement = (attunement, custom) => {
    const attunements = this.props.character.attunements;
    if (attunements.items.indexOf(attunement) > -1 || attunements.amount >= 3) return;
    attunements.items.push(attunement);
    attunements.amount++;
    api.updateCharacter({ id: this.props.character.id, attunements }, (success, response) => {
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

  removeAttunement = (attunement) => {
    const attunements = this.props.character.attunements;
    attunements.items.splice(attunements.items.indexOf(attunement), 1);
    attunements.amount--;
    api.updateCharacter({ id: this.props.character.id, attunements }, (success, response) => {
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
