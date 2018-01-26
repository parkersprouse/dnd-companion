import React, { Component } from 'react';
import { Tooltip, Position, Text, Checkbox } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import constants from '../../lib/constants';
import axios from 'axios';
import _ from 'lodash';
import SpellcastingClassEditor from './spell_sheet/SpellcastingClassEditor';
import SpellcastingDetailsEditors from './spell_sheet/SpellcastingDetailsEditors';
import SpellcastingSpellList from './spell_sheet/SpellcastingSpellList';

export default class SpellSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_spells: [],
      char_spells: []
    }
  }

  componentWillMount() {
    axios.get('/api/db/spells')
      .then((response) => {
        if (response.status === constants.http_ok) {
          const char_spells = [];
          _.forEach(response.data.content, (elem) => {
            _.forEach(this.props.character.spells, (spell) => {
              if (elem.id == spell.id) char_spells.push(elem);
            });
          });

          this.setState({ all_spells: response.data.content, char_spells });
        }
      })
      .catch((error) => { console.log(error.response.data) });
  }

  render() {
    //console.log(this.state)
    return (
      <Grid stackable stretched>

        <Grid.Row centered>
          <Grid.Column width={16}>
            <hr />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingClassEditor id={this.props.character.id}
                                       spell_class={this.props.character.spell_class} />
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              <SpellcastingDetailsEditors character={this.props.character} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={0}
                                     char_spells={this.state.char_spells}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={3}
                                     char_spells={this.state.char_spells}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={6}
                                     char_spells={this.state.char_spells}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={1}
                                     char_spells={this.state.char_spells}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={4}
                                     char_spells={this.state.char_spells}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={7}
                                     char_spells={this.state.char_spells}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={2}
                                     char_spells={this.state.char_spells}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={5}
                                     char_spells={this.state.char_spells}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={8}
                                     char_spells={this.state.char_spells}
                                     all_spells={this.state.all_spells} />
            </div>
            <div className='pt-card' style={{ marginTop: '2rem' }}>
              <SpellcastingSpellList level={9}
                                     char_spells={this.state.char_spells}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
