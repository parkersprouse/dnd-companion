import React, { Component } from 'react';
import { Tooltip, Position, InputGroup, Toaster, Intent } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import constants from '../../../lib/constants';

export default class CharacterShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available_spells: null,
      total_slots: null,
      used_slots: null,
      new_total_slots: null,
      new_used_slots: null,
      editing_total_slots: false,
      editing_used_slots: false
    };
  }

  componentWillReceiveProps(next_props) {
    if (!this.state.available_spells) {
      const available_spells = _.filter(next_props.all_spells, { level: next_props.level });
      const char_spells_of_level = _.filter(next_props.character.spells, { id: next_props.level })[0];
      const total_slots = char_spells_of_level.slots;
      const used_slots = char_spells_of_level.slots_used;
      const new_total_slots = char_spells_of_level.slots;
      const new_used_slots = char_spells_of_level.slots_used;
      this.setState({ available_spells, total_slots, used_slots, new_total_slots, new_used_slots });
    }
  }

  render() {
    console.log(this.state)
    if (this.props.level === 0) {
      return (
        <Grid>
          <Grid.Row centered textAlign='center'>
            <Grid.Column width={2} verticalAlign='middle'>
              <span className='char-sheet-spell-header'>
                { this.props.level }
              </span>
            </Grid.Column>
            <Grid.Column width={14} verticalAlign='middle'>
              <span className='char-sheet-spell-header'>
                Cantrips
              </span>
            </Grid.Column>
          </Grid.Row>
         </Grid>
      );
    }

    return (
      <Grid>
        <Grid.Row centered textAlign='center'>
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
       </Grid>
    );
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
        <span className='char-sheet-spell-header' onClick={() => this.setEditing({ [editing]: true })}>
          { this.state[initial] !== null && this.state[initial] !== '' ? this.state[initial] : 'None' }
        </span>
      </Tooltip>
    );
  }

  save = ({ editing, current, initial }) => {
    // When speaking of "spells" in this capacity, it's referring to the
    // collections of spells at a certain level, not an individual spell.

    const new_spells = _.reject(this.props.character.spells, { id: this.props.level });
    const edited_spell = _.filter(this.props.character.spells, { id: this.props.level })[0];

    if (current === 'new_total_slots')
      edited_spell.slots = this.state.new_total_slots;
    else
      edited_spell.slots_used = this.state.new_used_slots;

    new_spells.push(edited_spell);

    axios.patch('/api/characters/update', { id: this.props.character.id, spells: new_spells })
      .then((response) => {
        if (response.status === constants.http_ok) {
          this.setState({ [editing]: false, [initial]: this.state[current] });
          this.showSuccessToast();
        }
        else {
          this.showErrorToast();
        }
      })
      .catch((error) => {
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


}
