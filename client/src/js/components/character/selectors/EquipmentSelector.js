import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import axios from 'axios';
import _ from 'lodash';

export default class EquipmentSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipment: []
    };
  }

  componentWillMount() {
    axios.get('/api/db/equipment')
    .then((response) => {
      // remove weapons from equipment
      let equipment = _.reject(response.data.content, { equipment_category: "Weapon" });
      // remove armor from equipment
      equipment = _.reject(equipment, { equipment_category: "Armor" });
      this.setState({ equipment: equipment });
    })
    .catch((error) => {});
  }

  render() {
    return (
      <div>
        <Select
          items={this.state.equipment}
          itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
          itemRenderer={ ({ handleClick, isActive, item }) => {
            const style = isActive ? 'pt-active pt-intent-primary' : '';
            return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
          } }
          onItemSelect={this.selectEquipment}
          popoverProps={{ minimal: true, placement: 'top' }}
          noResults={<MenuItem disabled text="No results" />}
          resetOnSelect={true}
        >
          <Button className='pt-fill text-left dropdown-btn' rightIconName='caret-down' text={'Choose Equipment'} />
        </Select>
      </div>
    );
  }

  selectEquipment = (selected) => {
    let index = null;
    this.state.equipment.forEach((ele, i) => {
      if (ele.name === selected.name) index = i;
    });
    this.props.addEquipment(selected.name);
    if (index)
      this.state.equipment.splice(index, 1);
    this.forceUpdate();
  }
}
