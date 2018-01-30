import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Dialog, Button } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import SpellSearcherSpellDetails from '../components/spell_searcher/SpellSearcherSpellDetails';
import api from '../lib/api';
import _ from 'lodash';

export default class SpellSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spells: null,
      name_filter: '',
      level_filter: '',
      class_filter: '',
      school_filter: '',
      selected_spell: null
    };
  }

  componentWillMount() {
    api.getSpells((success, response) => {
      if (success)
        this.setState({ spells: _.sortBy(response.content, ['name']) });
    });
  }

  render() {
    let rendered_spells = null;
    if (this.state.name_filter || this.state.level_filter || this.state.class_filter || this.state.school_filter)
      rendered_spells = this.renderFilteredSpells();
    else
      rendered_spells = this.renderAllSpells();

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>

          <Grid centered stackable>

            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <div className='pt-control-group'>
                  <div className='pt-input-group pt-fill'>
                    <span className='pt-icon pt-icon-search'></span>
                    <input type='text' className='pt-input' placeholder='Filter Spells'
                           onChange={(event) => this.setState({ name_filter: event.target.value })} />
                  </div>
                  <div className='pt-form-group'>
                    <div className='pt-form-content'>
                      <div className='pt-select'>
                        <select onChange={(event) => this.setState({ level_filter: event.target.value })}>
                          <option value=''>All</option>
                          <option value='0'>Cantrips</option>
                          <option value='1'>Level 1</option>
                          <option value='2'>Level 2</option>
                          <option value='3'>Level 3</option>
                          <option value='4'>Level 4</option>
                          <option value='5'>Level 5</option>
                          <option value='6'>Level 6</option>
                          <option value='7'>Level 7</option>
                          <option value='8'>Level 8</option>
                          <option value='9'>Level 9</option>
                        </select>
                      </div>
                      <div className='pt-form-helper-text'>Spell Level</div>
                    </div>
                  </div>
                  <div className='pt-form-group'>
                    <div className='pt-form-content'>
                      <div className='pt-select'>
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
                      <div className='pt-select'>
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
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <table className='pt-table pt-bordered pt-striped pt-interactive' style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>Name</th>
                      <th>Range</th>
                      <th>Classes</th>
                      <th>School</th>
                      <th>Casting Time</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    { rendered_spells }
                  </tbody>
                </table>
              </Grid.Column>
            </Grid.Row>

          </Grid>

          { this.renderSpellModal() }

        </InnerContainer>
      </OuterContainer>
    );
  }

  renderSpellModal = () => {
    const spell = this.state.selected_spell;
    if (!spell) return null;
    return (
      <Dialog isOpen={!!spell} title={spell.name}
              onClose={() => this.setState({ selected_spell: null })}>
        <div className='pt-dialog-body'>
          <SpellSearcherSpellDetails spell={spell} />
        </div>
        <div className='pt-dialog-footer'>
          <div className='pt-dialog-footer-actions'>
            <Button onClick={() => this.setState({ selected_spell: null })} text='Close' />
          </div>
        </div>
      </Dialog>
    );
  }

  renderAllSpells = () => {
    const all_spells = [];
    _.each(this.state.spells, (spell) => {
      const spell_classes = _.map(spell.classes, (sc) => { return sc.name });
      all_spells.push(
        <tr key={spell.index} onClick={() => { this.setState({ selected_spell: spell }) }}>
          <td>{ spell.level === 0 ? 'Cantrip' : spell.level }</td>
          <td>{ spell.name }</td>
          <td>{ spell.range }</td>
          <td>{ _.join(spell_classes, ', ') }</td>
          <td>{ spell.school.name }</td>
          <td>{ spell.casting_time }</td>
          <td>{ spell.duration }</td>
        </tr>
      );
    });
    return all_spells;
  }

  renderFilteredSpells = () => {
    let filtered_spells = this.state.spells;

    if (this.state.name_filter)
      filtered_spells = _.filter(filtered_spells, (spell) => {
        return spell.name.toLowerCase().indexOf(this.state.name_filter.toLowerCase()) > -1;
      });

    if (this.state.level_filter)
      filtered_spells = _.filter(filtered_spells, { level: parseInt(this.state.level_filter, 10) });

    if (this.state.school_filter)
      filtered_spells = _.filter(filtered_spells, { school: { name: this.state.school_filter } });

    if (this.state.class_filter)
      filtered_spells = _.filter(filtered_spells, (spell) => {
        const spell_classes = _.map(spell.classes, (sc) => { return sc.name });
        return spell_classes.indexOf(this.state.class_filter) > -1;
      });

    const all_spells = [];
    _.each(filtered_spells, (spell) => {
      const spell_classes = _.map(spell.classes, (sc) => { return sc.name });
      all_spells.push(
        <tr key={spell.index} onClick={() => { this.setState({ selected_spell: spell }) }}>
          <td>{ spell.level === 0 ? 'Cantrip' : spell.level }</td>
          <td>{ spell.name }</td>
          <td>{ spell.range }</td>
          <td>{ _.join(spell_classes, ', ') }</td>
          <td>{ spell.school.name }</td>
          <td>{ spell.casting_time }</td>
          <td>{ spell.duration }</td>
        </tr>
      );
    });
    return all_spells;
  }

}
