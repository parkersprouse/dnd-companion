import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import axios from 'axios';

export default class ClassSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      isCustom: false
    };
  }

  componentDidMount() {
    axios.get('/api/db/classes')
    .then((response) => {
      this.setState({ classes: response.data.content });
    })
    .catch((error) => {});
  }

  swap = () => {
    this.props.dropdownUpdate({ class: null });
    this.setState({ isCustom: !this.state.isCustom });
  }

  render() {
    if (this.state.isCustom) {
      return (
        <div>
          <input name='class' className='pt-input pt-fill' type='text' onChange={this.props.update} />
          <div className='pt-form-helper-text'>Class (<a onClick={this.swap}>standard</a>)</div>
        </div>
      );
    }
    else {
      return (
        <div>
          <Select
            items={this.state.classes}
            itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
            itemRenderer={ ({ handleClick, isActive, item }) => {
              const style = isActive ? 'pt-active pt-intent-primary' : '';
              return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
            } }
            noResults={<MenuItem disabled={true} text="No results" />}
            onItemSelect={ (selected) => this.props.dropdownUpdate({ class: selected }) }
            popoverProps={{ minimal: true }}
          >
            <Button className='pt-fill text-left dropdown-btn' rightIconName="caret-down" text={!!this.props.parentState && !!this.props.parentState.class ? this.props.parentState.class.name : "Choose Class"} />
          </Select>
          <div className='pt-form-helper-text'>Class (<a onClick={this.swap}>custom</a>)</div>
        </div>
      );
    }
  }
}
