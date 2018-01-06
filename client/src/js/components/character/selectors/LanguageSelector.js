import React, { Component } from 'react';
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import axios from 'axios';

export default class AlignmentSelector extends Component {
  componentWillMount() {
    axios.get('/api/db/languages')
    .then((response) => {
      this.setState({ languages: response.data.content });
    })
    .catch((error) => {});
  }

  render() {
    return (
      <Select
        items={this.state.languages}
        itemRenderer={ ({ handleClick, isActive, item }) => {
          const style = isActive ? 'pt-active pt-intent-primary' : '';
          return <MenuItem className={style} label={null} key={item} onClick={handleClick} text={item} />
        } }
        onItemSelect={ (selected) => this.props.addLanguage(selected) }
        popoverProps={{ minimal: true }}
      >
        <Button className='pt-fill text-left dropdown-btn' rightIconName="caret-down" text={"Add Language"} />
      </Select>
    );
  }
}
