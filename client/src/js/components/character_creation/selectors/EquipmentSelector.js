import React, { Component } from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/labs';
import _ from 'lodash';
import api from '../../../lib/api';

export default class EquipmentSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipment: []
    };
  }

  componentWillMount() {
    api.getEquipment((success, response) => {
      if (success) {
        // remove weapons from equipment
        let equipment = _.reject(response.content, { equipment_category: 'Weapon' });
        // remove armor from equipment
        equipment = _.reject(equipment, { equipment_category: 'Armor' });
        this.setState({ equipment: _.sortBy(equipment, ['name']) });
      }
    });
  }

  render() {
    return (
      <div style={{ marginTop: '0.5rem' }}>
        <Select
          items={this.state.equipment}
          itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
          itemRenderer={ ({ handleClick, isActive, item }) => {
            const style = isActive ? 'pt-active pt-intent-primary' : '';
            return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
          } }
          onItemSelect={(selected) => this.props.addEquipment(selected.name)}
          popoverProps={{ minimal: true, placement: 'top' }}
          noResults={<MenuItem disabled text='No results' />}
          resetOnSelect={true}
        >
          <Button className='pt-fill text-left dropdown-btn' rightIconName='caret-down' text={'Choose Equipment'} />
        </Select>
      </div>
    );
  }
}
