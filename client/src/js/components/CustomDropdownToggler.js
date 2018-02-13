import React, { Component } from 'react';
import { Position, Toaster, Intent, Tooltip, InputGroup, MenuItem, Button } from '@blueprintjs/core';
import { Select } from '@blueprintjs/labs';
import axios from 'axios';
import { valueify } from '../lib/utils';
import api from '../lib/api';
import constants from '../lib/constants';

export default class CustomDropdownToggler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      custom: false,
      saving: false,
      [props.name]: valueify(props.character[props.name], ''),
      options: []
    }
  }

  componentWillMount() {
    if (this.props.name === 'alignment') {
      this.setState({
        options: [
          'Lawful Good',
          'Lawful Neutral',
          'Lawful Evil',
          'True Neutral',
          'Chaotic Good',
          'Chaotic Neutral',
          'Chaotic Evil'
        ]
      });
    }
    else {
      axios.get(constants.server + '/api/db/' + this.props.api)
      .then((response) => {
        this.setState({ options: response.data.content });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    }
  }

  render() {
    if (this.state.editing) {
      if (this.state.custom) {
        return (
          <div className='pt-form-group spellsheet-form-group' style={{ marginBottom: '0' }}>
            <div className='pt-form-content'>
              <div className='pt-input-group'>
                <InputGroup
                  value={this.state[this.props.name]}
                  placeholder={this.props.placeholder}
                  type={this.props.number ? 'number' : 'text'}
                  onChange={(event) => this.setState({ [this.props.name]: event.target.value }) }
                  rightElement={<Tooltip content='Save' position={Position.TOP}>
                                  <button className='pt-button pt-minimal pt-intent-success pt-icon-tick' onClick={this.save}></button>
                                </Tooltip>}
                />
              </div>
              <div className='pt-form-helper-text'>
                {this.props.label} (<a onClick={() => this.setCustom(false)}>standard</a>)
              </div>
            </div>
          </div>
        );
      }
      else {
        return (
          <div className='pt-form-group spellsheet-form-group' style={{ marginBottom: '0' }}>
            <div className='pt-form-content searcher'>
              <div>
                <Select
                  items={this.state.options}
                  itemPredicate={ (query, selected) => {
                    if (selected.name)
                      return selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
                    return selected.toLowerCase().indexOf(query.toLowerCase()) >= 0
                  }}
                  itemRenderer={ ({ handleClick, isActive, item }) => {
                    const style = isActive ? 'pt-active pt-intent-primary' : '';
                    return <MenuItem className={style} label={null}
                                     key={item.index ? item.index : item}
                                     onClick={handleClick}
                                     text={item.name ? item.name : item} />
                  } }
                  onItemSelect={ (selected) => this.selectItem(selected)}
                  popoverProps={{ minimal: true }}
                  noResults={<MenuItem disabled text='No results' />}
                  resetOnSelect={true}
                >
                  <Button className='pt-fill text-left dropdown-btn' rightIconName='caret-down'
                          text={this.state[this.props.name] ? this.state[this.props.name] : 'Choose ' + this.props.label} />
                </Select>
                <div className='pt-form-helper-text'>
                  {this.props.label} (<a onClick={() => this.setCustom(true)}>custom</a>)
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className='pt-form-group spellsheet-form-group'>
        <div className='pt-form-content'>
          <div className='pt-input-group'>
            <Tooltip content='Click to edit' position={Position.TOP}>
              <span className='char-sheet-editable-text' onClick={() => this.setEditing(true)}>
                { this.state[this.props.name] !== null &&
                  this.state[this.props.name] !== '' ?
                  this.state[this.props.name] : this.props.number ? '0' : 'None' }
              </span>
            </Tooltip>
          </div>
          <div className='pt-form-helper-text'>
            {this.props.label}
          </div>
        </div>
      </div>
    );
  }

  save = () => {
    this.setState({ saving: true });
    api.updateCharacter({ id: this.props.character.id, [this.props.name]: this.state[this.props.name] }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.setEditing(false);
      }
      else
        this.showErrorToast();
      this.setState({ saving: false });
    });
  }

  selectItem = (selected) => {
    const item = selected.name ? selected.name : selected;
    this.setState({ saving: true, [this.props.name]: item });
    api.updateCharacter({ id: this.props.character.id, [this.props.name]: item }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.setEditing(false);
      }
      else
        this.showErrorToast();
      this.setState({ saving: false });
    });
  }

  setEditing = (editing) => {
    this.setState({ editing });
  }

  setCustom = (custom) => {
    this.setState({ custom });
  }

  showErrorToast = () => {
    Toaster.create().show({
      message: 'Failed to update',
      position: Position.TOP_CENTER,
      intent: Intent.DANGER,
      timeout: 2000
    });
  }

  showSuccessToast = () => {
    Toaster.create().show({
      message: 'Successfully Updated',
      position: Position.TOP_CENTER,
      intent: Intent.SUCCESS,
      timeout: 2000
    });
  }
}
