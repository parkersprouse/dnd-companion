import React, { Component } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import _ from 'lodash';
import EquipmentTreeDisplay from './EquipmentTreeDisplay';
import EquipmentSelector from '../../character_creation/selectors/EquipmentSelector';
import api from '../../../../lib/api';

export default class EquipmentList extends Component {
  render() {
    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content searcher'>
          <EquipmentTreeDisplay character={this.props.character}
                                content={this.props.character.equipment}
                                remove={this.removeEquipment}
                                setRootState={this.props.setRootState} />
          <EquipmentSelector addEquipment={this.addEquipment} centered />
        </div>
      </div>
    );
  }

  addEquipment = (equip, custom) => {
    const equipment = this.props.character.equipment || [];
    if (_.find(equipment, { name: equip }) !== undefined) return;
    equipment.push({ name: equip, amount: 1, desc: '', custom: !!custom });
    api.updateCharacter({ id: this.props.character.id, equipment }, (success, response) => {
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

  removeEquipment = (equip) => {
    const equipment = this.props.character.equipment;
    equipment.splice(equipment.indexOf(equip), 1);
    api.updateCharacter({ id: this.props.character.id, equipment }, (success, response) => {
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
