import React, { Component } from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/labs';
import axios from 'axios';

export default class ProficiencySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proficiencies: [],
      isCustom: false,
      tempProficiency: ''
    };
  }

  componentWillMount() {
    axios.get('/api/db/proficiencies')
    .then((response) => {
      this.setState({ proficiencies: response.data.content });
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
            <input name='tempProficiency' value={this.state.tempProficiency} className='pt-input pt-fill' type='text'
                   onChange={(event) => this.setState({ [event.target.name]: event.target.value })} />
            <button className='pt-button pt-intent-primary pt-fixed' type='button'
                    onClick={() => { this.setState({ tempProficiency: '' }); this.props.addProficiency(this.state.tempProficiency); }}>Add</button>
          </div>
          <div className='pt-form-helper-text'>Proficiencies (<a onClick={this.swap}>standard</a>)</div>
        </div>
      );
    }
    else {
      return (
        <div style={{ marginTop: '0.5rem' }}>
          <Select
            items={this.state.proficiencies}
            itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
            itemRenderer={ ({ handleClick, isActive, item }) => {
              const style = isActive ? 'pt-active pt-intent-primary' : '';
              return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
            } }
            onItemSelect={ (selected) => this.props.addProficiency(selected.name) }
            popoverProps={{ minimal: true, placement: 'top' }}
            noResults={<MenuItem disabled text="No results" />}
            resetOnSelect={true}
          >
            <Button className='pt-fill text-left dropdown-btn' rightIconName='caret-down' text={'Choose Proficiency'} />
          </Select>
          <div className='pt-form-helper-text'>Proficiencies (<a onClick={this.swap}>custom</a>)</div>
        </div>
      );
    }
  }
}
