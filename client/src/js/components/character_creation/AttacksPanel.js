import React, { Component } from 'react';
import { Popover, Position, NumericInput } from '@blueprintjs/core';
import WeaponSelector from './selectors/WeaponSelector';
import ArmorSelector from './selectors/ArmorSelector';
import { isMobile } from '../../lib/utils';

export default class AttacksPanel extends Component {
  addWeapon = (weapon) => {
    if (!weapon) return;

    const rootState = this.props.rootState;
    if (rootState && rootState.weapons) {
      rootState.weapons.push(weapon);
      this.props.setRootState({
        weapons: rootState.weapons,
        [this.amountLabel(weapon)]: 1
      });
    }
    else
      this.props.setRootState({
        weapons: [weapon],
        [this.amountLabel(weapon)]: 1
      });
  }

  addArmor = (armor) => {
    if (!armor) return;

    const rootState = this.props.rootState;
    if (rootState && rootState.armor) {
      rootState.armor.push(armor);
      this.props.setRootState({
        armor: rootState.armor,
        [this.amountLabel(armor)]: 1
      });
    }
    else
      this.props.setRootState({
        armor: [armor],
        [this.amountLabel(armor)]: 1
      });
  }

  removeWeapon = (index) => {
    const weapon = this.props.rootState.weapons[index];
    this.props.rootState.weapons.splice(index, 1);
    this.props.setRootState({
      weapons: this.props.rootState.weapons,
      [this.amountLabel(weapon)]: null
    });
  }

  removeArmor = (index) => {
    const armor = this.props.rootState.armor[index];
    this.props.rootState.armor.splice(index, 1);
    this.props.setRootState({
      armor: this.props.rootState.armor,
      [this.amountLabel(armor)]: null
    });
  }

  amountLabel = (equipment) => {
    return equipment.toLowerCase().replace(/ /g, '_');
  }

  descLabel = (equipment) => {
    return this.amountLabel(equipment) + '_desc';
  }

  handleValueChange = (value, name) => {
    this.props.setRootState({ [name]: value });
  }

  render() {
    const weaponList = [];
    const armorList = [];

    if (this.props.rootState && this.props.rootState.weapons) {
      this.props.rootState.weapons.forEach((weapon, index) => {
        weaponList.push(
          <li key={index} className='pt-tree-node'>
            <div className='pt-tree-node-content'>
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>
                <Popover position={isMobile() ? Position.TOP_LEFT : Position.TOP}>
                  <span style={{ cursor: 'pointer' }}>{weapon}</span>
                  <div className='item-amount-popover'>
                    <span>Custom Description:</span>
                    <textarea name={this.descLabel(weapon)} rows='4'
                              value={this.props.rootState[this.descLabel(weapon)]}
                              className='pt-input pt-fill' type='text'
                              onChange={(event) => this.props.setRootState({ [event.target.name]: event.target.value })}
                              style={{ marginTop: '0.25rem' }}>
                    </textarea>
                  </div>
                </Popover>
              </span>
              <span className='pt-tree-node-secondary-label'>
                <Popover position={isMobile() ? Position.TOP_RIGHT : Position.TOP}>
                  <span className='item-list-amount'>x{this.props.rootState[this.amountLabel(weapon)]}</span>
                  <div className='item-amount-popover'>
                    <span>Amount:</span>
                    <NumericInput value={this.props.rootState[this.amountLabel(weapon)]} onValueChange={(num, str) => this.handleValueChange(str, this.amountLabel(weapon))} min={1} className='pt-fill' />
                  </div>
                </Popover>
                <a onClick={() => this.removeWeapon(index)} className='remove-item-btn'>
                  <span className='pt-icon-cross'></span>
                </a>
              </span>
            </div>
          </li>
        );
      });
    }

    if (this.props.rootState && this.props.rootState.armor) {
      this.props.rootState.armor.forEach((armor, index) => {
        armorList.push(
          <li key={index} className='pt-tree-node'>
            <div className='pt-tree-node-content'>
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>
                <Popover position={isMobile() ? Position.TOP_LEFT : Position.TOP}>
                  <span style={{ cursor: 'pointer' }}>{armor}</span>
                  <div className='item-amount-popover'>
                    <span>Custom Description:</span>
                    <textarea name={this.descLabel(armor)} rows='4'
                              value={this.props.rootState[this.descLabel(armor)]}
                              className='pt-input pt-fill' type='text'
                              onChange={(event) => this.props.setRootState({ [event.target.name]: event.target.value })}
                              style={{ marginTop: '0.25rem' }}>
                    </textarea>
                  </div>
                </Popover>
              </span>
              <span className='pt-tree-node-secondary-label'>
                <Popover position={isMobile() ? Position.TOP_RIGHT : Position.TOP}>
                  <span className='item-list-amount'>x{this.props.rootState[this.amountLabel(armor)]}</span>
                  <div className='item-amount-popover'>
                    <span>Amount:</span>
                    <NumericInput value={this.props.rootState[this.amountLabel(armor)]} onValueChange={(num, str) => this.handleValueChange(str, this.amountLabel(armor))} min={1} className='pt-fill' />
                  </div>
                </Popover>
                <a onClick={() => this.removeArmor(index)} className='remove-item-btn'>
                  <span className='pt-icon-cross'></span>
                </a>
              </span>
            </div>
          </li>
        );
      });
    }

    return (
      <div>
        <div className='pt-form-group' style={{ marginBottom: '2rem' }}>
          <div className='pt-form-content searcher'>
            <div className='pt-tree pt-elevation-0'>
              <ul className='pt-tree-node-list pt-tree-root'>
                {
                  weaponList.length > 0 ? weaponList :
                  <li className='pt-tree-node'>
                    <div className='pt-tree-node-content'>
                      <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}><i>None</i></span>
                    </div>
                  </li>
                }
              </ul>
            </div>
            <WeaponSelector addWeapon={this.addWeapon} rootState={this.props.rootState} />
          </div>
        </div>
        <div className='pt-form-group' style={{ marginBottom: '0' }}>
          <div className='pt-form-content searcher'>
            <div className='pt-tree pt-elevation-0'>
              <ul className='pt-tree-node-list pt-tree-root'>
                {
                  armorList.length > 0 ? armorList :
                  <li className='pt-tree-node'>
                    <div className='pt-tree-node-content'>
                      <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}><i>None</i></span>
                    </div>
                  </li>
                }
              </ul>
            </div>
            <ArmorSelector addArmor={this.addArmor} rootState={this.props.rootState} />
          </div>
        </div>
      </div>
    );
  }
}
