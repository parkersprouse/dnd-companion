import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import { Dialog, Button } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import WeaponDetails from '../components/WeaponDetails';
import api from '../lib/api';
import utils from '../lib/utils';
import _ from 'lodash';

export default class WeaponSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weapons: null,
      name_filter: '',
      category_filter: '',
      range_filter: '',
      property_filter: '',
      selected_weapon: null,
      dialog_open: false,
      loading: true
    };
  }

  componentWillMount() {
    api.getEquipment((success, response) => {
      if (success) {
        const weapons = _.filter(response.content, { equipment_category: 'Weapon' });
        this.setState({ weapons: _.sortBy(weapons, ['name']), loading: false });
      }
    });
  }

  render() {
    let rendered_weapons = null;
    if (this.state.name_filter || this.state.category_filter || this.state.range_filter || this.state.property_filter)
      rendered_weapons = this.renderFilteredSpells();
    else
      rendered_weapons = this.renderAllWeapons();

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>

          <Grid centered stackable>

            <Grid.Row verticalAlign='top'>
              <Grid.Column width={8} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                <div className='pt-input-group pt-fill'>
                  <span className='pt-icon pt-icon-search'></span>
                  <input type='text' className='pt-input' placeholder='Filter Weapons'
                         onChange={(event) => this.setState({ name_filter: event.target.value })} />
                </div>
              </Grid.Column>
              <Grid.Column width={8} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                { this.renderFilterDropdowns() }
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                {
                  this.state.loading ?
                    <Dimmer active inverted>
                      <Loader inverted content='Loading...' style={{ marginTop: '5rem' }} />
                    </Dimmer>
                  :
                    <table className='pt-table pt-bordered pt-striped pt-interactive' style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th className='text-center'>Name</th>
                          <th className='text-center'>Category</th>
                          <th className='text-center'>Range</th>
                          { !utils.isMobile() ? <th className='text-center'>Damage</th> : null }
                          { !utils.isMobile() ? <th className='text-center'>Properties</th> : null }
                        </tr>
                      </thead>
                      <tbody>
                        { rendered_weapons }
                      </tbody>
                    </table>
                }
              </Grid.Column>
            </Grid.Row>

          </Grid>

          { this.renderWeaponModal() }

        </InnerContainer>
      </OuterContainer>
    );
  }

  createWeaponList = (weapons) => {
    return _.map(weapons, (weapon) => {
      const weapon_props = _.join(_.map(weapon.properties, (wp) => wp.name), ', ');

      let weapon_damage = '';
      if(weapon.damage && weapon.damage.damage_type)
        if (weapon.damage.dice_value === 0)
          weapon_damage = weapon.damage.dice_count + ' ' + weapon.damage.damage_type.name;
        else
          weapon_damage = weapon.damage.dice_count + 'd' + weapon.damage.dice_value + ' ' + weapon.damage.damage_type.name;

      return (
        <tr key={weapon.index} onClick={() => { this.setState({ selected_weapon: weapon, dialog_open: true }) }}>
          <td>{ weapon.name }</td>
          <td>{ weapon.weapon_category }</td>
          <td>{ weapon.weapon_range }</td>
          { !utils.isMobile() ? <td>{ weapon_damage }</td> : null }
          { !utils.isMobile() ? <td>{ weapon_props }</td> : null }
        </tr>
      );
    });
  }

  renderWeaponModal = () => {
    const weapon = this.state.selected_weapon;
    return (
      <Dialog isOpen={this.state.dialog_open} title={weapon ? weapon.name : null}
              onClose={() => this.setState({ selected_weapon: null, dialog_open: false })}>
        <div className='pt-dialog-body'>
          <WeaponDetails weapon={weapon} />
        </div>
        <div className='pt-dialog-footer'>
          <div className='pt-dialog-footer-actions'>
            <Button onClick={() => this.setState({ selected_weapon: null, dialog_open: false })} text='Close' />
          </div>
        </div>
      </Dialog>
    );
  }

  renderAllWeapons = () => {
    return this.createWeaponList(this.state.weapons);
  }

  renderFilteredSpells = () => {
    let filtered_weapons = this.state.weapons;

    if (this.state.name_filter)
      filtered_weapons = _.filter(filtered_weapons, (weapon) => {
        return weapon.name.toLowerCase().indexOf(this.state.name_filter.toLowerCase()) > -1;
      });

    if (this.state.category_filter)
      filtered_weapons = _.filter(filtered_weapons, { weapon_category: this.state.category_filter });

    if (this.state.property_filter)
      filtered_weapons = _.filter(filtered_weapons, (weapon) => {
        const weapon_props = _.map(weapon.properties, (wp) => wp.name);
        return weapon_props.indexOf(this.state.property_filter) > -1;
      });

    if (this.state.range_filter)
      filtered_weapons = _.filter(filtered_weapons, { weapon_range: this.state.range_filter });

    return this.createWeaponList(filtered_weapons);
  }

  renderFilterDropdowns = () => {
    return (
      <Grid centered>
        <Grid.Row verticalAlign='top'>
          <Grid.Column width={5} style={{ paddingRight: '0.5rem', paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <div className='pt-select pt-fill'>
                  <select onChange={(event) => this.setState({ category_filter: event.target.value })}>
                    <option value=''>All</option>
                    <option>Simple</option>
                    <option>Martial</option>
                  </select>
                </div>
                <div className='pt-form-helper-text'>Weapon Category</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingRight: '0.5rem', paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <div className='pt-select pt-fill'>
                  <select onChange={(event) => this.setState({ range_filter: event.target.value })}>
                    <option value=''>All</option>
                    <option>Melee</option>
                    <option>Ranged</option>
                  </select>
                </div>
                <div className='pt-form-helper-text'>Weapon Range</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingRight: '0.5rem', paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <div className='pt-select pt-fill'>
                  <select onChange={(event) => this.setState({ property_filter: event.target.value })}>
                    <option value=''>All</option>
                    <option>Ammunition</option>
                    <option>Finesse</option>
                    <option>Heavy</option>
                    <option>Light</option>
                    <option>Loading</option>
                    <option>Reach</option>
                    <option>Special</option>
                    <option>Thrown</option>
                    <option>Two-Handed</option>
                    <option>Versatile</option>
                  </select>
                </div>
                <div className='pt-form-helper-text'>Weapon Property</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

}
