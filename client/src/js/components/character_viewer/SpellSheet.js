import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
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
    // The spell sheet will display the spells in different orders
    // on desktop and mobile. This is to keep it looking like the real
    // spell sheet on desktop, but to allow it to fall in numerical order
    // on mobile.
    let level_order = [3, 6, 1, 4, 7, 2, 5, 8, 9];
    if (utils.isMobile())
      level_order = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
      <Grid stackable>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <CustomDropdownToggler character={this.props.character}
                                     api='classes'
                                     name='spell_class'
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
                                       all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[0]}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[1]}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[2]}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[3]}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[4]}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[5]}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[6]}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <SpellcastingSpellList level={level_order[7]}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
            <div className='pt-card' style={{ marginTop: '2rem' }}>
              <SpellcastingSpellList level={level_order[8]}
                                     character={this.props.character}
                                     all_spells={this.state.all_spells} />
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
