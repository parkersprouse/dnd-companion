import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";

export default class AlignmentSelector extends Component {

  options = [
    'Lawful Good',
    'Lawful Neutral',
    'Lawful Evil',
    'Neutral Good',
    'True Neutral',
    'Neutral Evil',
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
          noResults={<MenuItem disabled text="No results" />}
          resetOnSelect={true}
        >
          <Button className='pt-fill text-left dropdown-btn' rightIconName="caret-down"
                  text={!!this.props.root_state && !!this.props.root_state.alignment ? this.props.root_state.alignment : "Choose Alignment"} />
        </Select>
        <div className='pt-form-helper-text'>Alignment</div>
      </div>
    );
  }
}
