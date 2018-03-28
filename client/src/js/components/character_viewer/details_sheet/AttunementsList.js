import React, { Component } from 'react';
import { Button, Intent, MenuItem, Position, Toaster } from '@blueprintjs/core';
import { Select } from '@blueprintjs/labs';
import _ from 'lodash';
import api from '../../../lib/api';
import AttunementsTreeDisplay from './AttunementsTreeDisplay';

export default class AttunementsList extends Component {
  render() {
    let options = _.map(this.props.character.equipment || [], 'name');
    options = _.concat(options, _.map(this.props.character.weapons || [], 'name'));
    options = _.concat(options, _.map(this.props.character.armor || [], 'name'));
    options = _.sortBy(options, (i) => i);

    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content searcher'>
          <AttunementsTreeDisplay character={this.props.character}
                                  content={this.props.character.attunements ? this.props.character.attunements.items : []}
                                  remove={this.removeAttunement}
                                  setRootState={this.props.setRootState} />
          <div style={{ marginTop: '0.5rem' }}>
            <Select
              items={options}
              itemPredicate={ (query, selected) => selected.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
              itemRenderer={ ({ handleClick, isActive, item }) => {
                const style = isActive ? 'pt-active pt-intent-primary' : '';
                return <MenuItem className={style} label={null} key={item} onClick={handleClick} text={item} />
              } }
              onItemSelect={ (selected) => this.addAttunement(selected) }
              popoverProps={{ minimal: true, placement: 'top' }}
              noResults={<MenuItem disabled text='No results' />}
              resetOnSelect={true}
            >
              <Button className='pt-fill text-left dropdown-btn' rightIconName='caret-down' text={'Choose Item'} />
            </Select>
            <div className='pt-form-helper-text text-center'>Attunements</div>
          </div>
        </div>
      </div>
    );
  }

  addAttunement = (attunement, custom) => {
    const attunements = this.props.character.attunements || { amount: 0, items: [] };
    if (attunements.items.indexOf(attunement) > -1 || attunements.amount >= 3) return;
    attunements.items.push(attunement);
    attunements.amount++;
    api.updateCharacter({ id: this.props.character.id, attunements }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.forceUpdate();
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        this.showErrorToast();
    });
  }

  removeAttunement = (attunement) => {
    const attunements = this.props.character.attunements;
    attunements.items.splice(attunements.items.indexOf(attunement), 1);
    attunements.amount--;
    api.updateCharacter({ id: this.props.character.id, attunements }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.forceUpdate();
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        this.showErrorToast();
    });
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
