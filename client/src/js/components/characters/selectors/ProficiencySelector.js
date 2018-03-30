import React, { Component } from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/labs';
import _ from 'lodash';
import api from '../../../lib/api';

export default class ProficiencySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proficiencies: [],
      is_custom: false,
      temp_proficiency: ''
    };
  }

  componentWillMount() {
    if (this.props.options)
      this.setState({ proficiencies: _.sortBy(this.props.options, ['name']) });
    else
      api.getProficiencies((success, response) => {
        if (success)
          this.setState({ proficiencies: _.sortBy(response.content, ['name']) });
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
            <input name='temp_proficiency' value={this.state.temp_proficiency} className='pt-input pt-fill' type='text'
                   onChange={(event) => this.setState({ [event.target.name]: event.target.value })} />
            <button className='pt-button pt-intent-primary pt-fixed' type='button'
                    onClick={() => { this.setState({ temp_proficiency: '' }); this.props.addProficiency(this.state.temp_proficiency, true); }}>Add</button>
          </div>
          <div className={'pt-form-helper-text' + (this.props.centered ? ' text-center' : '')}>Proficiencies (<a onClick={this.swap}>standard</a>)</div>
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
          <div className={'pt-form-helper-text' + (this.props.centered ? ' text-center' : '')}>Proficiencies (<a onClick={this.swap}>custom</a>)</div>
        </div>
      );
    }
  }
}
