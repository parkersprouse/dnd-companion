import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import axios from 'axios';
import _ from 'lodash';

export default class EquipmentSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      armor: [],
      tempArmor: '',
      isCustom: false
    };
  }

  componentWillMount() {
    axios.get('/api/db/equipment')
    .then((response) => {
      // get armor from equipment
      const armor = _.filter(response.data.content, { equipment_category: "Armor" });
      this.setState({ armor: armor });
    })
    .catch((error) => {});
  }

  swap = () => {
    this.setState({ isCustom: !this.state.isCustom });
  }

  render() {
    if (this.state.isCustom) {
      return (
        <div style={{ marginTop: '0.5rem' }}>
          <div className='pt-control-group pt-fill'>
            <input name='tempArmor' value={this.state.tempArmor} className='pt-input pt-fill' type='text'
                   onChange={(event) => this.setState({ [event.target.name]: event.target.value })} />
            <button className='pt-button pt-intent-primary pt-fixed'
                    onClick={() => { this.setState({ tempArmor: '' }); this.props.addArmor(this.state.tempArmor); }}>Add</button>
          </div>
          <div className='pt-form-helper-text'>Armor (<a onClick={this.swap}>standard</a>)</div>
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
            onItemSelect={ (selected) => this.props.addArmor(selected.name) }
            popoverProps={{ minimal: true, placement: 'top' }}
            noResults={<MenuItem disabled text="No results" />}
            resetOnSelect={true}
          >
            <Button className='pt-fill text-left dropdown-btn' rightIconName='caret-down' text={'Choose Armor'} />
          </Select>
          <div className='pt-form-helper-text'>Armor (<a onClick={this.swap}>custom</a>)</div>
        </div>
      );
    }
  }
}
