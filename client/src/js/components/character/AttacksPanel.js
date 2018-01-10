import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import WeaponSelector from './selectors/WeaponSelector';
import ArmorSelector from './selectors/ArmorSelector';

export default class AttacksPanel extends Component {
  addWeapon = (weapon) => {
    if (!weapon) return;
    const rootState = this.props.rootState;
    if (rootState && rootState.weapons) {
      rootState.weapons.push(weapon);
      this.props.setRootState({ weapons: rootState.weapons });
    }
    else
      this.props.setRootState({ weapons: [weapon] });
  }

  addArmor = (armor) => {
    if (!armor) return;
    const rootState = this.props.rootState;
    if (rootState && rootState.armor) {
      rootState.armor.push(armor);
      this.props.setRootState({ armor: rootState.armor });
    }
    else
      this.props.setRootState({ armor: [armor] });
  }

  removeWeapon = (index) => {
    this.props.rootState.weapons.splice(index, 1);
    this.props.setRootState({ weapons: this.props.rootState.weapons });
  }

  removeArmor = (index) => {
    this.props.rootState.armor.splice(index, 1);
    this.props.setRootState({ armor: this.props.rootState.armor });
  }

  render() {
    const weaponList = [];
    const armorList = [];

    if (this.props.rootState && this.props.rootState.weapons) {
      this.props.rootState.weapons.forEach((weapon, index) => {
        weaponList.push(
          <li key={index} className='pt-tree-node'>
            <div className='pt-tree-node-content'>
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>{weapon}</span>
              <span className='pt-tree-node-secondary-label'>
                <a onClick={() => this.removeWeapon(index)} style={{ color: 'red' }}>
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
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>{armor}</span>
              <span className='pt-tree-node-secondary-label'>
                <a onClick={() => this.removeArmor(index)} style={{ color: 'red' }}>
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
