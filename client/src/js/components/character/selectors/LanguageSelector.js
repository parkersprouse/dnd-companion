import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import axios from 'axios';

export default class LanguageSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      isCustom: false,
      tempLanguage: ''
    };
  }

  componentWillMount() {
    axios.get('/api/db/languages')
    .then((response) => {
      this.setState({ languages: response.data.content });
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
            <input name='tempLanguage' value={this.state.tempLanguage} className='pt-input pt-fill' type='text'
                   onChange={(event) => this.setState({ [event.target.name]: event.target.value })} />
            <button className='pt-button pt-intent-primary pt-fixed'
                    onClick={() => { this.setState({ tempLanguage: '' }); this.props.addLanguage(this.state.tempLanguage); }}>Add</button>
          </div>
          <div className='pt-form-helper-text'>Languages (<a onClick={this.swap}>standard</a>)</div>
        </div>
      );
    }
    else {
      return (
        <div style={{ marginTop: '0.5rem' }}>
          <Select
            items={this.state.languages}
            itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
            itemRenderer={ ({ handleClick, isActive, item }) => {
              const style = isActive ? 'pt-active pt-intent-primary' : '';
              return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
            } }
            onItemSelect={ selected => this.props.addLanguage(selected.name) }
            popoverProps={{ minimal: true, placement: 'top' }}
            resetOnSelect={true}
          >
            <Button className='pt-fill text-left dropdown-btn' rightIconName="caret-down" text={"Choose Language"} />
          </Select>
          <div className='pt-form-helper-text'>Languages (<a onClick={this.swap}>custom</a>)</div>
        </div>
      );
    }
  }
}
