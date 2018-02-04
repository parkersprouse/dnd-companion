import React, { Component } from 'react';
import { Position, Toaster, Intent, Button, Dialog, MenuItem } from '@blueprintjs/core';
import { Select } from "@blueprintjs/labs";
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import api from '../../../lib/api';
import SpellDetails from '../../SpellDetails';

export default class SpellcastingCantripList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available_spells: null,
      char_spells: null,
      select_dialog_open: false
    };
  }

  componentWillReceiveProps(next_props) {
    if (!this.state.available_spells) {
      const available_spells = _.filter(next_props.all_spells, { level: 0 });
      const char_spells = _.find(next_props.character.spells, { id: 0 });
      this.setState({ available_spells, char_spells });
    }
  }

  render() {
    const spell_list = this.createSpellList();
    return (
      <Grid>
        <Grid.Row centered textAlign='center' className='spell-list-header-row'>
          <Grid.Column width={2} verticalAlign='middle'>
            <span className='char-sheet-spell-header'>
              0
            </span>
          </Grid.Column>
          <Grid.Column width={14} verticalAlign='middle'>
            <span className='char-sheet-spell-header'>
              Cantrips
            </span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={16} verticalAlign='middle'>
            <div className='pt-tree pt-elevation-0'>
              <ul className='pt-tree-node-list pt-tree-root'>
                {
                  spell_list.length > 0 ? spell_list :
                  <li className='pt-tree-node'>
                    <div className='pt-tree-node-content'>
                      <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}><i>No Cantrips</i></span>
                    </div>
                  </li>
                }
              </ul>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row textAlign='right' style={{ paddingBottom: '0' }}>
          <Grid.Column width={16} verticalAlign='middle'>
            <Button iconName='plus' intent={Intent.PRIMARY} type='button'
                    className='pt-small pt-minimal' onClick={() => this.toggleSelectDialog()} />
          </Grid.Column>
        </Grid.Row>

        { this.renderSelectCantripModal() }
        { this.renderShowCantripModal() }
      </Grid>
    );
  }

  addCantrip = () => {
    const cantrips = _.find(this.props.character.spells, { id: 0 });

    if (_.find(cantrips.spells, { id: this.state.selected_cantrip.index }) !== undefined)
      return null;

    this.setState({ loading: true });
    cantrips.spells.push({ id: this.state.selected_cantrip.index });
    api.updateCharacter({ id: this.props.character.id, spells: this.props.character.spells }, (success, response) => {
      if (success) {
        this.toggleSelectDialog();
        this.showSuccessToast();
        this.setState({ char_spells: _.find(response.content.spells, { id: 0 }) });
      }
      else
        this.showErrorToast();
      this.setState({ loading: false });
    });
  }

  createSpellList = () => {
    const detailed_spells = [];
    _.each(this.state.available_spells, (a_spell) => {
      _.each(this.state.char_spells.spells, (b_spell) => {
        if (a_spell.index + '' === b_spell.id + '') detailed_spells.push(a_spell);
      });
    });

    const rendered_spells = [];
    _.each(detailed_spells, (spell) => {
      rendered_spells.push(
        <li key={ spell.index } className='pt-tree-node' style={{ textAlign: 'left' }}>
          <div className='pt-tree-node-content'>
            <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }} onClick={() => this.setState({ shown_cantrip: spell })}>{ spell.name }</span>
            <span className='pt-tree-node-secondary-label'>
              <a onClick={() => this.deleteCantrip(spell.index)} className='remove-item-btn'>
                <span className='pt-icon-cross'></span>
              </a>
            </span>
          </div>
        </li>
      );
    });

    return rendered_spells;
  }

  deleteCantrip = (cantrip_id) => {
    const cantrips = _.find(this.props.character.spells, { id: 0 });

    let index_to_remove = null;
    _.each(cantrips.spells, (cantrip, i) => {
      if (cantrip_id === cantrip.id) index_to_remove = i;
    });

    if (index_to_remove !== null) {
      cantrips.spells.splice(index_to_remove, 1);

      api.updateCharacter({ id: this.props.character.id, spells: this.props.character.spells }, (success, response) => {
        if (success) {
          this.showSuccessToast();
          this.setState({ char_spells: _.find(response.content.spells, { id: 0 }) });
        }
        else
          this.showErrorToast();
      });
    }
  }

  renderSelectCantripModal = () => {
    return (
      <Dialog isOpen={this.state.select_dialog_open} onClose={() => this.toggleSelectDialog()} title='Find Cantrip'>
        <div className='pt-dialog-body'>

          <Select
            items={this.state.available_spells}
            itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
            itemRenderer={ ({ handleClick, isActive, item }) => {
              const style = isActive ? 'pt-active pt-intent-primary' : '';
              return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
            } }
            onItemSelect={ (selected) => this.setState({ selected_cantrip: selected }) }
            popoverProps={{ minimal: true, placement: 'top' }}
            noResults={<MenuItem disabled text="No results" />}
            resetOnSelect={true}
          >
            <Button className='pt-fill text-left dropdown-btn' rightIconName="caret-down"
                    text={this.state.selected_cantrip ? this.state.selected_cantrip.name : "Choose Cantrip"} />
          </Select>
          { this.state.selected_cantrip ? <hr /> : null }
          <div>
            <SpellDetails spell={this.state.selected_cantrip} />
          </div>
          { this.state.selected_cantrip ? <hr style={{ marginBottom: '0' }} /> : null }
        </div>
        <div className='pt-dialog-footer'>
          <div className='pt-dialog-footer-actions'>
            <Button text='Close' onClick={() => this.toggleSelectDialog()} />
            <Button text='Add Cantrip' disabled={!this.state.selected_cantrip || this.state.loading} intent={Intent.PRIMARY} onClick={() => this.addCantrip()} />
          </div>
        </div>
      </Dialog>
    );
  }

  renderShowCantripModal = () => {
    return (
      <Dialog isOpen={!!this.state.shown_cantrip} onClose={() => this.toggleShowDialog()} title={this.state.shown_cantrip ? this.state.shown_cantrip.name : ''}>
        <div className='pt-dialog-body'>
          <SpellDetails spell={this.state.shown_cantrip} />
        </div>
        <div className='pt-dialog-footer'>
          <div className='pt-dialog-footer-actions'>
            <Button text='Close' onClick={() => this.toggleShowDialog()} />
          </div>
        </div>
      </Dialog>
    );
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

  toggleSelectDialog = () => {
    this.setState({ select_dialog_open: !this.state.select_dialog_open, selected_cantrip: null });
  }

  toggleShowDialog = () => {
    this.setState({ shown_cantrip: null });
  }

}
