import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Popover, Position, NumericInput } from '@blueprintjs/core';
import _ from 'lodash';
import EquipmentSelector from './selectors/EquipmentSelector';
import FormLabel from '../FormLabel';
import { isMobile } from '../../lib/utils';

export default class EquipmentPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp_equipment: ''
    }
  }

  render() {
    const equipmentList = [];
    if (this.props.root_state && this.props.root_state.equipment) {
      const equipment = _.sortBy(this.props.root_state.equipment, (e) => e);
      equipment.forEach((equip, index) => {
        equipmentList.push(
          <li key={index} className='pt-tree-node'>
            <div className='pt-tree-node-content'>
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>
                <Popover position={isMobile() ? Position.TOP_LEFT : Position.TOP}>
                  <span style={{ cursor: 'pointer' }}>{equip}</span>
                  <div className='item-amount-popover'>
                    <span>Custom Description:</span>
                    <textarea name={this.descLabel(equip)} rows='4'
                              value={this.props.root_state[this.descLabel(equip)]}
                              className='pt-input pt-fill' type='text'
                              onChange={(event) => this.props.setRootState({ [event.target.name]: event.target.value })}
                              style={{ marginTop: '0.25rem' }}>
                    </textarea>
                  </div>
                </Popover>
              </span>
              <span className='pt-tree-node-secondary-label'>
                <Popover position={isMobile() ? Position.TOP_RIGHT : Position.TOP}>
                  <span className='item-list-amount'>x{this.props.root_state[this.amountLabel(equip)]}</span>
                  <div className='item-amount-popover'>
                    <span>Amount:</span>
                    <NumericInput value={this.props.root_state[this.amountLabel(equip)]} onValueChange={(num, str) => this.handleValueChange(str, this.amountLabel(equip))} min={1} className='pt-fill' />
                  </div>
                </Popover>
                <a onClick={() => this.removeEquipment(equip)} className='remove-item-btn'>
                  <span className='pt-icon-cross'></span>
                </a>
              </span>
            </div>
          </li>
        );
      });
    }

    return (
      <Grid stackable centered verticalAlign='middle'>

        <Grid.Row centered>
          <Grid.Column width={8}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content searcher'>
                <div className='pt-tree pt-elevation-0'>
                  <ul className='pt-tree-node-list pt-tree-root'>
                    {
                      equipmentList.length > 0 ? equipmentList :
                      <li className='pt-tree-node'>
                        <div className='pt-tree-node-content'>
                          <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}><i>None</i></span>
                        </div>
                      </li>
                    }
                  </ul>
                </div>
                <EquipmentSelector addEquipment={this.addEquipment} />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div style={isMobile() ? null : { width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' }}>
              <div className='pt-form-group' style={{ marginBottom: '2rem' }}>
                <div className='pt-form-content'>
                  <NumericInput value={this.props.root_state.platinum} onValueChange={(num, str) => this.handleValueChange(str, 'platinum')} min={0} />
                  <div className="pt-form-helper-text"><FormLabel>Platinum</FormLabel></div>
                </div>
              </div>
              <div className='pt-form-group' style={{ marginBottom: '1.5rem' }}>
                <div className='pt-form-content'>
                  <NumericInput value={this.props.root_state.gold} onValueChange={(num, str) => this.handleValueChange(str, 'gold')} min={0} />
                  <div className="pt-form-helper-text"><FormLabel>Gold</FormLabel></div>
                </div>
              </div>
              <div className='pt-form-group' style={{ marginBottom: '1.5rem' }}>
                <div className='pt-form-content'>
                  <NumericInput value={this.props.root_state.electrum} onValueChange={(num, str) => this.handleValueChange(str, 'electrum')} min={0} />
                  <div className="pt-form-helper-text"><FormLabel>Electrum</FormLabel></div>
                </div>
              </div>
              <div className='pt-form-group' style={{ marginBottom: '1.5rem' }}>
                <div className='pt-form-content'>
                  <NumericInput value={this.props.root_state.silver} onValueChange={(num, str) => this.handleValueChange(str, 'silver')} min={0} />
                  <div className="pt-form-helper-text"><FormLabel>Silver</FormLabel></div>
                </div>
              </div>
              <div className='pt-form-group' style={{ marginBottom: '0' }}>
                <div className='pt-form-content'>
                  <NumericInput value={this.props.root_state.copper} onValueChange={(num, str) => this.handleValueChange(str, 'copper')} min={0} />
                  <div className="pt-form-helper-text"><FormLabel>Copper</FormLabel></div>
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }

  addEquipment = (equip, custom) => {
    const root_state = this.props.root_state;
    const equipment = root_state.equipment || [];
    if (!equip || equipment.indexOf(equip) > -1) return;

    equipment.push(equip);
    this.props.setRootState({ equipment, [this.amountLabel(equip)]: 1, [this.customLabel(equip)]: !!custom });
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

  removeEquipment = (equip) => {
    const { equipment } = this.props.root_state;
    equipment.splice(equipment.indexOf(equip), 1);
    this.props.setRootState({ equipment });
  }

}
