import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import axios from 'axios';

export default class AlignmentSelector extends Component {

  options = [
    'Lawful Good',
    'Lawful Neutral',
    'Lawful Evil',
    'True Neutral',
    'Chaotic Good',
    'Chaotic Neutral',
    'Chaotic Evil'
  ]

  render() {
    return (
      <div>
        <Select
          items={this.options}
          itemPredicate={ (query, selected) => selected.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
          itemRenderer={ ({ handleClick, isActive, item }) => {
            const style = isActive ? 'pt-active pt-intent-primary' : '';
            return <MenuItem className={style} label={null} key={item} onClick={handleClick} text={item} />
          } }
          onItemSelect={ (selected) => this.props.setRootState({ alignment: selected }) }
          popoverProps={{ minimal: true }}
          resetOnSelect={true}
        >
          <Button className='pt-fill text-left dropdown-btn' rightIconName="caret-down"
                  text={!!this.props.rootState && !!this.props.rootState.alignment ? this.props.rootState.alignment : "Choose Alignment"} />
        </Select>
        <div className='pt-form-helper-text'>Alignment</div>
      </div>
    );
  }
}
