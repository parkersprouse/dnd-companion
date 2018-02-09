import React, { Component } from 'react';
import { Tooltip, Position, InputGroup, Toaster, Intent, Button, Dialog, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/labs';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import api from '../../../lib/api';
import SpellDetails from '../../SpellDetails';

export default class SpellcastingSpellList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available_spells: null,
      char_spells: null,
      total_slots: null,
      used_slots: null,
      new_total_slots: null,
      new_used_slots: null,
      editing_total_slots: false,
      editing_used_slots: false,
      select_dialog_open: false
    };
  }

  componentWillReceiveProps(next_props) {
    if (!this.state.available_spells) {
      const available_spells = _.filter(next_props.all_spells, { level: next_props.level });
      const char_spells = _.find(next_props.character.spells, { id: next_props.level });

      const total_slots = char_spells.slots;
      const used_slots = char_spells.slots_used;
      const new_total_slots = char_spells.slots;
      const new_used_slots = char_spells.slots_used;

      this.setState({ available_spells, char_spells, total_slots, used_slots, new_total_slots, new_used_slots });
    }
  }

  // As much as I want to use the InputToggler component for these inputs,
  // I can't in its current implementation because the name of the attribute
  // it's updating is part of the 'spells' attribute instead of being their
  // own attributes.
  render() {
    const spell_list = this.createSpellList();
    return (
      <Grid>
        <Grid.Row centered textAlign='center' className='spell-list-header-row'>
          <Grid.Column width={2} verticalAlign='middle'>
            <span className='char-sheet-spell-header'>
              { this.props.level }
            </span>
          </Grid.Column>
          <Grid.Column width={7} verticalAlign='middle'>
            <div className='pt-form-group spellsheet-form-group'>
              <div className='pt-form-content'>
                <div className='pt-input-group'>
                  {
                    this.renderDetails({
                      editing: 'editing_total_slots',
                      current: 'new_total_slots',
                      initial: 'total_slots'
                    })
                  }
                </div>
                <div className='pt-form-helper-text'>
                  Total Slots
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={7} verticalAlign='middle'>
            <div className='pt-form-group spellsheet-form-group'>
              <div className='pt-form-content'>
                <div className='pt-input-group'>
                  {
                    this.renderDetails({
                      editing: 'editing_used_slots',
                      current: 'new_used_slots',
                      initial: 'used_slots'
                    })
                  }
                </div>
                <div className='pt-form-helper-text'>
                  Expended Slots
                </div>
              </div>
            </div>
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
                      <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}><i>No Spells</i></span>
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
                    className='pt-small pt-minimal' onClick={this.toggleSelectDialog} />
          </Grid.Column>
        </Grid.Row>

        { this.renderSelectSpellModal() }
        { this.renderShowSpellModal() }
      </Grid>
    );
  }

  addSpell = () => {
    const spells = _.find(this.props.character.spells, { id: this.props.level });

    if (_.find(spells.spells, { id: this.state.selected_spell.index }) !== undefined)
      return null;

    this.setState({ loading: true });
    spells.spells.push({ id: this.state.selected_spell.index, prepared: false });
    api.updateCharacter({ id: this.props.character.id, spells: this.props.character.spells }, (success, response) => {
      if (success) {
        this.toggleSelectDialog();
        this.showSuccessToast();
        this.setState({ char_spells: _.find(response.content.spells, { id: this.props.level}) });
      }
      else
        this.showErrorToast();
      this.setState({ loading: false });
    });
  }

  checkPreparedBox = (event, spell) => {
    const spells = _.find(this.props.character.spells, { id: this.props.level });
    const char_spell = _.find(spells.spells, { id: spell.index });
    char_spell.prepared = event.target.checked;

    api.updateCharacter({ id: this.props.character.id, spells: this.props.character.spells }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.setState({ char_spells: _.find(response.content.spells, { id: this.props.level}) });
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
      const char_spell = _.find(this.state.char_spells.spells, { id: spell.index });
      rendered_spells.push(
        <li key={ spell.index } className='pt-tree-node text-left'>
          <div className='pt-tree-node-content'>
            <span className='pt-tree-node-icon pt-icon-standard' style={{ marginRight: '0', marginLeft: '10px' }}>
              <Tooltip content={ char_spell.prepared ? 'Prepared' : 'Not Prepared' } position={Position.TOP}>
                <label className='pt-control pt-switch' style={{ marginBottom: '0', paddingLeft: '26px' }}>
                  <input type='checkbox' defaultChecked={ char_spell.prepared } onChange={(event) => this.checkPreparedBox(event, spell)} />
                  <span className='pt-control-indicator'></span>
                </label>
              </Tooltip>
            </span>
            <span className='pt-tree-node-label' style={{ marginLeft: '0.75rem' }} onClick={() => this.setState({ shown_spell: spell })}>{ spell.name }</span>
            <span className='pt-tree-node-secondary-label'>
              <a onClick={() => this.deleteSpell(spell.index)} className='remove-item-btn'>
                <span className='pt-icon-cross'></span>
              </a>
            </span>
          </div>
        </li>
      );
    });

    return rendered_spells;
  }

  deleteSpell = (spell_id) => {
    const spells = _.find(this.props.character.spells, { id: this.props.level });

    let index_to_remove = null;
    _.each(spells.spells, (spell, i) => {
      if (spell_id === spell.id) index_to_remove = i;
    });

    if (index_to_remove !== null) {
      spells.spells.splice(index_to_remove, 1);

      api.updateCharacter({ id: this.props.character.id, spells: this.props.character.spells }, (success, response) => {
        if (success) {
          this.showSuccessToast();
          this.setState({ char_spells: _.find(response.content.spells, { id: this.props.level }) });
        }
        else
          this.showErrorToast();
      });
    }
  }

  determineShownSpells = () => {
    let shown_spells = this.state.available_spells;

    if (this.state.school_filter)
      shown_spells = _.filter(shown_spells, { school: { name: this.state.school_filter } });

    if (this.state.class_filter)
      shown_spells = _.filter(shown_spells, (spell) => {
        const spell_classes = _.map(spell.classes, (sc) => { return sc.name });
        return spell_classes.indexOf(this.state.class_filter) > -1;
      });

    return shown_spells;
  }

  renderDetails = ({ editing, current, initial }) => {
    if (this.state[editing])
      return (
        <InputGroup
          value={this.state[current]} type='number'
          onChange={(event) => this.setState({ [current]: event.target.value }) }
          rightElement={<Tooltip content='Save' position={Position.TOP}>
                          <button className='pt-button pt-minimal pt-intent-success pt-icon-tick'
                                  onClick={() => this.saveSlots({ editing, current, initial })}></button>
                        </Tooltip>}
        />
      );

    return (
      <Tooltip content='Click to edit' position={Position.TOP}>
        <span className='char-sheet-spell-header-editable' onClick={() => this.setEditing({ [editing]: true })}>
          { this.state[initial] !== null && this.state[initial] !== '' ? this.state[initial] : '0' }
        </span>
      </Tooltip>
    );
  }

  renderSelectSpellModal = () => {
    return (
      <Dialog isOpen={this.state.select_dialog_open} onClose={this.toggleSelectDialog} title={'Find Level ' + this.props.level + ' Spell'}>
        <div className='pt-dialog-body'>

          <Select
            items={this.determineShownSpells()}
            itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
            itemRenderer={ ({ handleClick, isActive, item }) => {
              const style = isActive ? 'pt-active pt-intent-primary' : '';
              return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
            } }
            onItemSelect={ (selected) => this.setState({ selected_spell: selected }) }
            popoverProps={{ minimal: true, placement: 'top' }}
            noResults={<MenuItem disabled text='No results' />}
            resetOnSelect={true}
          >
            <Button className='pt-fill text-left dropdown-btn' rightIconName='caret-down'
                    text={this.state.selected_spell ? this.state.selected_spell.name : 'Choose Spell'} />
          </Select>

          <div className='spell-modal-filters'>
            <div className='pt-form-group'>
              <div className='pt-form-content'>
                <div className='pt-select pt-fill'>
                  <select onChange={(event) => this.setState({ class_filter: event.target.value })}>
                    <option value=''>All</option>
                    <option>Bard</option>
                    <option>Cleric</option>
                    <option>Druid</option>
                    <option>Paladin</option>
                    <option>Ranger</option>
                    <option>Sorcerer</option>
                    <option>Warlock</option>
                    <option>Wizard</option>
                  </select>
                </div>
                <div className='pt-form-helper-text'>Spell Class</div>
              </div>
            </div>
            <div className='pt-form-group'>
              <div className='pt-form-content'>
                <div className='pt-select pt-fill'>
                  <select onChange={(event) => this.setState({ school_filter: event.target.value })}>
                    <option value=''>All</option>
                    <option>Abjuration</option>
                    <option>Conjuration</option>
                    <option>Divination</option>
                    <option>Enchantment</option>
                    <option>Evocation</option>
                    <option>Illusion</option>
                    <option>Necromancy</option>
                    <option>Transmutation</option>
                  </select>
                </div>
                <div className='pt-form-helper-text'>Spell School</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <SpellDetails spell={this.state.selected_spell} />
          </div>
        </div>
        <div className='pt-dialog-footer'>
          <div className='pt-dialog-footer-actions'>
            <Button text='Close' onClick={this.toggleSelectDialog} />
            <Button text='Add Spell' disabled={!this.state.selected_spell || this.state.loading} intent={Intent.PRIMARY} onClick={this.addSpell} />
          </div>
        </div>
      </Dialog>
    );
  }

  renderShowSpellModal = () => {
    return (
      <Dialog isOpen={!!this.state.shown_spell} onClose={this.toggleShowDialog} title={this.state.shown_spell ? this.state.shown_spell.name : ''}>
        <div className='pt-dialog-body'>
          <SpellDetails spell={this.state.shown_spell} />
        </div>
        <div className='pt-dialog-footer'>
          <div className='pt-dialog-footer-actions'>
            <Button text='Close' onClick={this.toggleShowDialog} />
          </div>
        </div>
      </Dialog>
    );
  }

  saveSlots = ({ editing, current, initial }) => {
    const edited_spell_slot = _.find(this.props.character.spells, { id: this.props.level });

    if (current === 'new_total_slots')
      edited_spell_slot.slots = this.state.new_total_slots || 0;
    else
      edited_spell_slot.slots_used = this.state.new_used_slots || 0;

    api.updateCharacter({ id: this.props.character.id, spells: this.props.character.spells }, (success, response) => {
      if (success) {
        this.setState({ [editing]: false, [initial]: this.state[current] });
        this.showSuccessToast();
      }
      else
        this.showErrorToast();
    });
  }

  setEditing = (editing) => {
    this.setState(editing);
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
    this.setState({ select_dialog_open: !this.state.select_dialog_open, selected_spell: null });
  }

  toggleShowDialog = () => {
    this.setState({ shown_spell: null });
  }

}
