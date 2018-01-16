import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import axios from 'axios';
import _ from 'lodash';

export default class WeaponSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weapons: [],
      tempWeapon: '',
      isCustom: false
    };
  }

  componentWillMount() {
    axios.get('/api/db/equipment')
    .then((response) => {
      // get only weapons from equipment
      const weapons = _.filter(response.data.content, { equipment_category: "Weapon" });
      this.setState({ weapons: weapons });
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
            <input name='tempWeapon' value={this.state.tempWeapon} className='pt-input pt-fill' type='text'
                   onChange={(event) => this.setState({ [event.target.name]: event.target.value })} />
            <button className='pt-button pt-intent-primary pt-fixed'
                    onClick={() => { this.setState({ tempWeapon: '' }); this.props.addWeapon(this.state.tempWeapon); }}>Add</button>
          </div>
          <div className='pt-form-helper-text'>Weapons (<a onClick={this.swap}>standard</a>)</div>
        </div>
      );
    }
    else {
      return (
        <div style={{ marginTop: '0.5rem' }}>
          <Select
            items={this.state.weapons}
            itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
            itemRenderer={ ({ handleClick, isActive, item }) => {
              const style = isActive ? 'pt-active pt-intent-primary' : '';
              return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
            } }
            onItemSelect={ (selected) => this.props.addWeapon(selected.name) }
            popoverProps={{ minimal: true, placement: 'top' }}
            noResults={<MenuItem disabled text="No results" />}
            resetOnSelect={true}
          >
            <Button className='pt-fill text-left dropdown-btn' rightIconName='caret-down' text={'Choose Weapon'} />
          </Select>
          <div className='pt-form-helper-text'>Weapons (<a onClick={this.swap}>custom</a>)</div>
        </div>
      );
    }

  }
}
