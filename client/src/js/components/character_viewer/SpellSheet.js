import React, { Component } from 'react';
import { Tooltip, Position, Text, Checkbox } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import api from '../../lib/api';
import _ from 'lodash';
import SpellcastingClassEditor from './spell_sheet/SpellcastingClassEditor';
import SpellcastingDetailsEditors from './spell_sheet/SpellcastingDetailsEditors';
import SpellcastingSpellList from './spell_sheet/SpellcastingSpellList';

export default class SpellSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_spells: []
    }
  }

  componentWillMount() {
    api.getSpells((success, response) => {
      if (success)
        this.setState({ all_spells: response.content });
      else
        console.log(response)
    });
  }

  render() {
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
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={3}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={6}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={1}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={4}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={7}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={2}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={5}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={8}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
            <div className='pt-card' style={{ marginTop: '2rem' }}>
              <SpellcastingSpellList level={9}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
