import React, { Component } from 'react';
import { Tooltip, Position, Text } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import constants from '../../lib/constants';
import axios from 'axios';
import _ from 'lodash';
import SpellcastingClassEditor from './spell_sheet/SpellcastingClassEditor';
import SpellcastingDetailsEditors from './spell_sheet/SpellcastingDetailsEditors';

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
      .catch((error) => {});
  }

  renderSpellList = (slot) => {
    return slot + '';
  }

  render() {
    console.log(this.state)
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
              Level 0
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(3) }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(6) }
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(1) }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(4) }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(7) }
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(2) }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(5) }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(8) }
            </div>
            <div className='pt-card' style={{ marginTop: '2rem' }}>
              { this.renderSpellList(9) }
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
