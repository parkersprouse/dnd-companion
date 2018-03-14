import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Button, Position, Toaster, Intent } from '@blueprintjs/core';
import api from '../../lib/api';
import utils from '../../lib/utils';
import CustomDropdownToggler from '../CustomDropdownToggler';
import SpellcastingDetailsPanel from './spell_sheet/SpellcastingDetailsPanel';
import SpellcastingSpellList from './spell_sheet/SpellcastingSpellList';
import SpellcastingCantripList from './spell_sheet/SpellcastingCantripList';
import _ from 'lodash';

export default class SpellSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_spells: [],
      resting: false
    }
  }

  componentWillMount() {
    api.getSpells((success, response) => {
      if (success)
        this.setState({ all_spells: _.sortBy(response.content, ['name']) });
      else
        console.log(response);
    });
  }

  render() {
    // The spell sheet will display the spells in different orders
    // on desktop and mobile. This is to keep it looking like the real
    // spell sheet on desktop, but to allow it to fall in numerical order
    // on mobile.
    let level_order = [3, 6, 1, 4, 7, 2, 5, 8, 9];
    if (utils.isMobile())
      level_order = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
      <Grid stackable>

        <div className='text-right' style={{ width: '100%' }}>
          <Button intent={Intent.PRIMARY} className='pt-minimal'
                  onClick={this.rest}
                  loading={this.state.resting}
                  style={{ marginRight: '2.5rem' }}>
          Complete Rest</Button>
        </div>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <CustomDropdownToggler character={this.props.character}
                                     setRootState={this.props.setRootState}
                                     api='classes' name='spell_class'
                                     label='Spellcasting Class' />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              <SpellcastingDetailsPanel character={this.props.character} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingCantripList character={this.props.character}
                                       setRootState={this.props.setRootState}
                                       all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[0]}
                                     setRootState={this.props.setRootState}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[1]}
                                     setRootState={this.props.setRootState}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[2]}
                                     setRootState={this.props.setRootState}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[3]}
                                     setRootState={this.props.setRootState}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[4]}
                                     setRootState={this.props.setRootState}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[5]}
                                     setRootState={this.props.setRootState}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[6]}
                                     setRootState={this.props.setRootState}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[7]}
                                     setRootState={this.props.setRootState}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
            <div className='pt-card' style={{ marginTop: '2rem' }}>
              <SpellcastingSpellList level={level_order[8]}
                                     setRootState={this.props.setRootState}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }

  rest = () => {
    this.setState({ resting: true });
    const spells = _.cloneDeep(this.props.character.spells);

    _.each(spells, (spell, index) => {
      spell.slots_used = '0';
    });

    api.updateCharacter({ id: this.props.character.id, spells: spells }, (success, response) => {
      if (success) {
        _.each(this.props.character.spells, (spell, index) => {
          spell.slots_used = '0';
        });
        this.showSuccessToast();
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        this.showErrorToast();
      this.setState({ resting: false });
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
