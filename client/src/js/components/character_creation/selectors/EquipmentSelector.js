import React, { Component } from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/labs';
import _ from 'lodash';
import api from '../../../lib/api';

export default class EquipmentSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipment: [],
      is_custom: false,
      temp_equipment: ''
    };
  }

  componentWillMount() {
    api.getEquipment((success, response) => {
      if (success) {
        // remove weapons and armor from equipment
        const equipment = _.reject(response.content, (e) => {
          return e.equipment_category === 'Armor' || e.equipment_category === 'Weapon';
        });
        this.setState({ equipment: _.sortBy(equipment, ['name']) });
      }
    });
  }

  swap = () => {
    this.setState({ is_custom: !this.state.is_custom });
  }

  render() {
    if (this.state.is_custom) {
      return (
        <div style={this.props.marginless ? null : { marginTop: '0.5rem' }}>
          <div className='pt-control-group pt-fill'>
            <input name='temp_equipment' value={this.state.temp_equipment} className='pt-input pt-fill' type='text'
                   onChange={(event) => this.setState({ [event.target.name]: event.target.value })} />
            <button className='pt-button pt-intent-primary pt-fixed' type='button'
                    onClick={() => { this.setState({ temp_equipment: '' }); this.props.addEquipment(this.state.temp_equipment, true); }}>Add</button>
          </div>
          <div className={'pt-form-helper-text' + (this.props.centered ? ' text-center' : '')}>Equipment (<a onClick={this.swap}>standard</a>)</div>
        </div>
      );
    }
    else {
      return (
        <div style={this.props.marginless ? null : { marginTop: '0.5rem' }}>
          <Select
            items={this.state.equipment}
            itemPredicate={(query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0}
            itemRenderer={({ handleClick, isActive, item }) => {
              const style = isActive ? 'pt-active pt-intent-primary' : '';
              return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
            }}
            onItemSelect={(selected) => this.props.addEquipment(selected.name)}
            popoverProps={{ minimal: true, placement: 'top' }}
            noResults={<MenuItem disabled text='No results' />}
            resetOnSelect={true}
          >
            <Button className='pt-fill text-left dropdown-btn' rightIconName='caret-down' text={'Choose Equipment'} />
          </Select>
          <div className={'pt-form-helper-text' + (this.props.centered ? ' text-center' : '')}>Equipment (<a onClick={this.swap}>custom</a>)</div>
        </div>
      );
    }
  }
}
