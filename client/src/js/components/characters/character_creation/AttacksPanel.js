import React, { Component } from 'react';
import { Popover, Position, NumericInput } from '@blueprintjs/core';
import _ from 'lodash';
import WeaponSelector from '../selectors/WeaponSelector';
import ArmorSelector from '../selectors/ArmorSelector';
import { isMobile } from '../../../lib/utils';

export default class AttacksPanel extends Component {
  addWeapon = (weapon, custom) => {
    const root_state = this.props.root_state;
    const weapons = root_state.weapons || [];
    if (!weapon || weapons.indexOf(weapon) > -1) return;

    weapons.push(weapon);
    this.props.setRootState({ weapons, [this.amountLabel(weapon)]: 1, [this.customLabel(weapon)]: !!custom });
  }

  addArmor = (arm, custom) => {
    const root_state = this.props.root_state;
    const armor = root_state.armor || [];
    if (!arm || armor.indexOf(arm) > -1) return;

    armor.push(arm);
    this.props.setRootState({ armor, [this.amountLabel(arm)]: 1, [this.customLabel(arm)]: !!custom });
  }

  removeWeapon = (weapon) => {
    const { weapons } = this.props.root_state;
    weapons.splice(weapons.indexOf(weapon), 1);
    this.props.setRootState({ weapons });
  }

  removeArmor = (item) => {
    const { armor } = this.props.root_state;
    armor.splice(armor.indexOf(item), 1);
    this.props.setRootState({ armor });
  }

  amountLabel = (equipment) => {
    return equipment.toLowerCase().replace(/ /g, '_');
  }

  customLabel = (equipment) => {
    return this.amountLabel(equipment) + '_custom';
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

    if (this.props.root_state && this.props.root_state.weapons) {
      const weapons = _.sortBy(this.props.root_state.weapons, (w) => w);
      weapons.forEach((weapon, index) => {
        weaponList.push(
          <li key={index} className='pt-tree-node'>
            <div className='pt-tree-node-content'>
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>
                <Popover position={isMobile() ? Position.TOP_LEFT : Position.TOP}>
                  <span style={{ cursor: 'pointer' }}>{weapon}</span>
                  <div className='item-amount-popover'>
                    <span>Custom Description:</span>
                    <textarea name={this.descLabel(weapon)} rows='4'
                              value={this.props.root_state[this.descLabel(weapon)]}
                              className='pt-input pt-fill' type='text'
                              onChange={(event) => this.props.setRootState({ [event.target.name]: event.target.value })}
                              style={{ marginTop: '0.25rem' }}>
                    </textarea>
                  </div>
                </Popover>
              </span>
              <span className='pt-tree-node-secondary-label'>
                <Popover position={isMobile() ? Position.TOP_RIGHT : Position.TOP}>
                  <span className='item-list-amount'>x{this.props.root_state[this.amountLabel(weapon)]}</span>
                  <div className='item-amount-popover'>
                    <span>Amount:</span>
                    <NumericInput value={this.props.root_state[this.amountLabel(weapon)]} onValueChange={(num, str) => this.handleValueChange(str, this.amountLabel(weapon))} min={1} className='pt-fill' />
                  </div>
                </Popover>
                <a onClick={() => this.removeWeapon(weapon)} className='remove-item-btn'>
                  <span className='pt-icon-cross'></span>
                </a>
              </span>
            </div>
          </li>
        );
      });
    }

    if (this.props.root_state && this.props.root_state.armor) {
      const armor = _.sortBy(this.props.root_state.armor, (a) => a);
      armor.forEach((armor, index) => {
        armorList.push(
          <li key={index} className='pt-tree-node'>
            <div className='pt-tree-node-content'>
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>
                <Popover position={isMobile() ? Position.TOP_LEFT : Position.TOP}>
                  <span style={{ cursor: 'pointer' }}>{armor}</span>
                  <div className='item-amount-popover'>
                    <span>Custom Description:</span>
                    <textarea name={this.descLabel(armor)} rows='4'
                              value={this.props.root_state[this.descLabel(armor)]}
                              className='pt-input pt-fill' type='text'
                              onChange={(event) => this.props.setRootState({ [event.target.name]: event.target.value })}
                              style={{ marginTop: '0.25rem' }}>
                    </textarea>
                  </div>
                </Popover>
              </span>
              <span className='pt-tree-node-secondary-label'>
                <Popover position={isMobile() ? Position.TOP_RIGHT : Position.TOP}>
                  <span className='item-list-amount'>x{this.props.root_state[this.amountLabel(armor)]}</span>
                  <div className='item-amount-popover'>
                    <span>Amount:</span>
                    <NumericInput value={this.props.root_state[this.amountLabel(armor)]} onValueChange={(num, str) => this.handleValueChange(str, this.amountLabel(armor))} min={1} className='pt-fill' />
                  </div>
                </Popover>
                <a onClick={() => this.removeArmor(armor)} className='remove-item-btn'>
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
            <WeaponSelector addWeapon={this.addWeapon} />
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
            <ArmorSelector addArmor={this.addArmor} />
          </div>
        </div>
      </div>
    );
  }
}
