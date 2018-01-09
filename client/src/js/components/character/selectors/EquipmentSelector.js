import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import axios from 'axios';

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
      this.setState({ equipment: response.data.content });
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
          onItemSelect={ (selected) => this.props.addEquipment(selected.name) }
          popoverProps={{ minimal: true }}
          resetOnSelect={true}
        >
          <Button className='pt-fill text-left dropdown-btn' rightIconName='caret-down' text={'Choose Equipment'} />
        </Select>
      </div>
    );
  }
}
