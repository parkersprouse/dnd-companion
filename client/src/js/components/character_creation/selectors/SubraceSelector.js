import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import api from '../../../lib/api';

export default class SubraceSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subraces: [],
      all_subraces: [],
      isCustom: false
    };
    this.loading = false;
  }

  componentDidMount() {
    api.getSubraces((success, response) => {
      if (success)
        this.setState({ subraces: response.content, all_subraces: response.content });
    });
  }

  componentWillUpdate(next_props, nextState) {
    // this doesn't actually mean anything is loading, just that the dropdown
    // shouldn't make a new request because the race hasn't changed
    this.loading = this.props.rootState.race === next_props.rootState.race;
  }

  updateOptions = () => {
    if (!this.props.rootState.race || this.loading) return;
    this.loading = true;

    api.filterSubraces({ race: { name: this.props.rootState.race } }, (success, response) => {
      if (success) {
        this.setState({ subraces: response.content });
        this.props.setRootState({ subrace: null });
        this.loading = false;
      }
      else {
        this.setState({ subraces: [] });
        this.props.setRootState({ subrace: null });
        this.loading = false;
      }
    });
  }

  swap = () => {
    this.props.setRootState({ subrace: null });
    this.setState({ isCustom: !this.state.isCustom });
  }

  render() {
    this.updateOptions();

    if (this.state.isCustom) {
      return (
        <div>
          <input name='subrace' className='pt-input pt-fill' type='text' onChange={this.props.update} />
          <div className='pt-form-helper-text'>Subrace (<a onClick={this.swap}>standard</a>)</div>
        </div>
      );
    }
    else {
      return (
        <div>
          <Select
            items={this.state.subraces}
            itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
            itemRenderer={ ({ handleClick, isActive, item }) => {
              const style = isActive ? 'pt-active pt-intent-primary' : '';
              return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
            } }
            onItemSelect={ (selected) => this.props.setRootState({ subrace: selected.name }) }
            popoverProps={{ minimal: true }}
            noResults={<MenuItem disabled text="No results" />}
            resetOnSelect={true}
          >
            <Button className='pt-fill text-left dropdown-btn' rightIconName="caret-down" text={!!this.props.rootState && !!this.props.rootState.subrace ? this.props.rootState.subrace : "Choose Subrace"} />
          </Select>
          <div className='pt-form-helper-text'>Subrace (<a onClick={this.swap}>custom</a>)</div>
        </div>
      );
    }
  }
}
