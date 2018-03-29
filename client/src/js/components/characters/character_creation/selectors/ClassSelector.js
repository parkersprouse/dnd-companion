import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import _ from 'lodash';
import api from '../../../../lib/api';

export default class ClassSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      isCustom: false
    };
  }

  componentDidMount() {
    api.getClasses((success, response) => {
      if (success)
        this.setState({ classes: _.sortBy(response.content, ['name']) });
    });
  }

  swap = () => {
    this.props.setRootState({ class: null });
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
            onItemSelect={ (selected) => this.props.setRootState({ class: selected.name }) }
            popoverProps={{ minimal: true }}
            noResults={<MenuItem disabled text="No results" />}
            resetOnSelect={true}
          >
            <Button className='pt-fill text-left dropdown-btn' rightIconName="caret-down" text={!!this.props.root_state && !!this.props.root_state.class ? this.props.root_state.class : "Choose Class"} />
          </Select>
          <div className='pt-form-helper-text'>Class (<a onClick={this.swap}>custom</a>)</div>
        </div>
      );
    }
  }
}
