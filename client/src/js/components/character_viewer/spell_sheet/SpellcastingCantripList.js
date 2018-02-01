import React, { Component } from 'react';
import { Position, Toaster, Intent, Button, Dialog, MenuItem } from '@blueprintjs/core';
import { Select } from "@blueprintjs/labs";
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import api from '../../../lib/api';

export default class SpellcastingCantripList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      available_spells: null,
      char_spells: null,
      dialog_open: false
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
            <div>
              { spell_list.length < 1 ? 'No Cantrips' : spell_list }
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row textAlign='right'>
          <Grid.Column width={16} verticalAlign='middle'>
            <Button iconName='plus' intent={Intent.PRIMARY} type='button'
                    className='pt-small pt-minimal' onClick={() => this.toggleDialog()} />
          </Grid.Column>
        </Grid.Row>

        <Dialog isOpen={this.state.dialog_open} onClose={() => this.toggleDialog()} title='Find Cantrip'>
          <div className='pt-dialog-body'>

            <Select
              items={this.state.available_spells}
              itemPredicate={ (query, selected) => selected.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 }
              itemRenderer={ ({ handleClick, isActive, item }) => {
                const style = isActive ? 'pt-active pt-intent-primary' : '';
                return <MenuItem className={style} label={null} key={item.index} onClick={handleClick} text={item.name} />
              } }
              onItemSelect={ (selected) => null }
              popoverProps={{ minimal: true, placement: 'top' }}
              noResults={<MenuItem disabled text="No results" />}
              resetOnSelect={true}
            >
              <Button className='pt-fill text-left dropdown-btn' rightIconName="caret-down"
                      text={"Choose Cantrip"} />
            </Select>

          </div>
          <div className='pt-dialog-footer'>
            <div className='pt-dialog-footer-actions'>
              <Button text='Close' onClick={() => this.toggleDialog()} />
              <Button text='Add Cantrip' intent={Intent.PRIMARY} onClick={() => this.toggleDialog()} />
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
    this.setState({ dialog_open: !this.state.dialog_open });
  }

}
