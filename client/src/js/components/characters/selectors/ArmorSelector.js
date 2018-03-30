import React, { Component } from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/labs';
import _ from 'lodash';
import api from '../../../lib/api';

export default class EquipmentSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      armor: [],
      temp_armor: '',
      is_custom: false
    };
  }

  componentWillMount() {
    api.getEquipment((success, response) => {
      if (success) {
        const armor = _.filter(response.content, { equipment_category: 'Armor' });
        this.setState({ armor: _.sortBy(armor, ['name']) });
      }
    });
  }

  swap = () => {
    this.setState({ is_custom: !this.state.is_custom });
  }

  render() {
    if (this.state.is_custom) {
      return (
        <div style={{ marginTop: '0.5rem' }}>
          <div className='pt-control-group pt-fill'>
            <input name='temp_armor' value={this.state.temp_armor} className='pt-input pt-fill' type='text'
                   onChange={(event) => this.setState({ [event.target.name]: event.target.value })} />
            <button className='pt-button pt-intent-primary pt-fixed' type='button'
                    onClick={() => { this.setState({ temp_armor: '' }); this.props.addArmor(this.state.temp_armor, true); }}>Add</button>
          </div>
          <div className={'pt-form-helper-text' + (this.props.centered ? ' text-center' : '')}>Armor (<a onClick={this.swap}>standard</a>)</div>
        </div>
      );
    }
    else {
      return (
        <div style={{ marginTop: '0.5rem' }}>
          <Select
            items={this.state.armor}
            itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
            itemRenderer={ ({ handleClick, isActive, item }) => {
              const style = isActive ? 'pt-active pt-intent-primary' : '';
              return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
            } }
            onItemSelect={(selected) => this.props.addArmor(selected.name)}
            popoverProps={{ minimal: true, placement: 'top' }}
            noResults={<MenuItem disabled text='No results' />}
            resetOnSelect={true}
          >
            <Button className='pt-fill text-left dropdown-btn' rightIconName='caret-down' text={'Choose Armor'} />
          </Select>
          <div className={'pt-form-helper-text' + (this.props.centered ? ' text-center' : '')}>Armor (<a onClick={this.swap}>custom</a>)</div>
        </div>
      );
    }
  }
}
