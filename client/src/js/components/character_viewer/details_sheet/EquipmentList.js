import React, { Component } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import _ from 'lodash';
import EquipmentTreeDisplay from '../EquipmentTreeDisplay';
import EquipmentSelector from '../../character_creation/selectors/EquipmentSelector';
import api from '../../../lib/api';

export default class EquipmentList extends Component {
  render() {
    const filtered_equipment = _.reject(this.props.character.equipment, (p) => {
      return p.equipment_category === 'Armor' ||
             p.equipment_category === 'Weapon';
    });

    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content searcher'>
          <EquipmentTreeDisplay content={filtered_equipment}
                                remove={this.removeEquipment} />
          <EquipmentSelector addEquipment={this.addEquipment} />
        </div>
      </div>
    );
  }

  addEquipment = (equip) => {
    const equipment = this.props.character.equipment || [];
    if (equipment.indexOf(equip) > -1) return;
    equipment.push({ name: equip, amount: 1 });
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
