import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import axios from 'axios';

export default class LanguageSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: []
    };
  }

  componentWillMount() {
    axios.get('/api/db/languages')
    .then((response) => {
      this.setState({ languages: response.data.content });
    })
    .catch((error) => {});
  }

  render() {
    return (
      <div style={{ marginBottom: '0.5rem' }}>
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
          <Button className='pt-fill text-left dropdown-btn' rightIconName="caret-down" text={"Add Standard Language"} />
        </Select>
      </div>
    );
  }
}
