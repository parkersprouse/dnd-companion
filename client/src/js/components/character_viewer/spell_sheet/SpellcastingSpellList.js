import React, { Component } from 'react';
import { Tooltip, Position, InputGroup, Toaster, Intent, Button, Dialog, MenuItem } from '@blueprintjs/core';
import { Select } from "@blueprintjs/labs";
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
      spells_open: false
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
            <div>
              { spell_list.length < 1 ? 'No Spells' : spell_list }
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row textAlign='right' style={{ paddingBottom: '0' }}>
          <Grid.Column width={16} verticalAlign='middle'>
            <Button iconName='plus' intent={Intent.PRIMARY} type='button'
                    className='pt-small pt-minimal' onClick={() => this.toggleDialog()} />
          </Grid.Column>
        </Grid.Row>

        <Dialog isOpen={this.state.spells_open} onClose={() => this.toggleDialog()} title={'Find Level ' + this.props.level + ' Spell'}>
          <div className='pt-dialog-body'>

            <Select
              items={this.state.available_spells}
              itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
              itemRenderer={ ({ handleClick, isActive, item }) => {
                const style = isActive ? 'pt-active pt-intent-primary' : '';
                return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
              } }
              onItemSelect={ (selected) => this.setState({ selected_spell: selected }) }
              popoverProps={{ minimal: true, placement: 'top' }}
              noResults={<MenuItem disabled text="No results" />}
              resetOnSelect={true}
            >
              <Button className='pt-fill text-left dropdown-btn' rightIconName="caret-down"
                      text={this.state.selected_spell ? this.state.selected_spell.name : "Choose Spell"} />
            </Select>
            { this.state.selected_spell ? <hr /> : null }
            <div>
              <SpellDetails spell={this.state.selected_spell} />
            </div>
            { this.state.selected_spell ? <hr /> : null }
          </div>
          <div className='pt-dialog-footer'>
            <div className='pt-dialog-footer-actions'>
              <Button text='Close' onClick={() => this.toggleDialog()} />
              <Button text='Add Spell' intent={Intent.PRIMARY} onClick={() => this.toggleDialog()} />
            </div>
          </div>
        </Dialog>
      </Grid>
    );
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
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid black' }}>
          { spell.name }
        </div>
      );
    });

    return rendered_spells;
  }

  renderDetails = ({ editing, current, initial }) => {
    if (this.state[editing])
      return (
        <InputGroup
          value={this.state[current]} type='text'
          onChange={(event) => this.setState({ [current]: event.target.value }) }
          rightElement={<Tooltip content='Save' position={Position.TOP}>
                          <button className='pt-button pt-minimal pt-intent-success pt-icon-tick'
                                  onClick={() => this.save({ editing, current, initial })}></button>
                        </Tooltip>}
        />
      );

    return (
      <Tooltip content='Click to edit' position={Position.TOP}>
        <span className='char-sheet-spell-header-editable' onClick={() => this.setEditing({ [editing]: true })}>
          { this.state[initial] !== null && this.state[initial] !== '' ? this.state[initial] : 'None' }
        </span>
      </Tooltip>
    );
  }

  save = ({ editing, current, initial }) => {
    // When speaking of 'spells' in this capacity, it's referring to the
    // collections of spells at a certain level, not an individual spell.

    const new_spells = _.reject(this.props.character.spells, { id: this.props.level });
    const edited_spell = _.filter(this.props.character.spells, { id: this.props.level })[0];

    if (current === 'new_total_slots')
      edited_spell.slots = this.state.new_total_slots;
    else
      edited_spell.slots_used = this.state.new_used_slots;

    new_spells.push(edited_spell);

    api.updateCharacter({ id: this.props.character.id, spells: new_spells }, (success, response) => {
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

  toggleDialog = () => {
    this.setState({ spells_open: !this.state.spells_open, selected_spell: null });
  }

}
