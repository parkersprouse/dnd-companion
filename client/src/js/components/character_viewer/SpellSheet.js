import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import api from '../../lib/api';
import utils from '../../lib/utils';
import SpellcastingClassEditor from './spell_sheet/SpellcastingClassEditor';
import SpellcastingDetailsEditors from './spell_sheet/SpellcastingDetailsEditors';
import SpellcastingSpellList from './spell_sheet/SpellcastingSpellList';
import SpellcastingCantripList from './spell_sheet/SpellcastingCantripList';
import _ from 'lodash';

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
        this.setState({ all_spells: _.sortBy(response.content, ['name']) });
      else
        console.log(response);
    });
  }

  render() {
    if (utils.isMobile())
      return this.renderMobile();
    return this.renderDesktop();
  }

  renderDesktop() {
    return (
      <Grid stackable>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingClassEditor character={this.props.character} />
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
              <SpellcastingCantripList character={this.props.character}
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

  /*
   * We need to reorder the columns for viewing on mobile so that the
   * spell lists are all in numerical order. 
   */
  renderMobile() {
    return (
      <Grid stackable>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingClassEditor character={this.props.character} />
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
              <SpellcastingCantripList character={this.props.character}
                                       all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={1}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={2}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={3}
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
              <SpellcastingSpellList level={5}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={6}
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
