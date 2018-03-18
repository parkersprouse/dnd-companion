import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import { Dialog, Button } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import ArmorDetails from '../components/ArmorDetails';
import api from '../lib/api';
import utils from '../lib/utils';
import _ from 'lodash';

export default class ArmorSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      armors: null,
      name_filter: '',
      category_filter: '',
      strength_filter: '',
      stealth_filter: '',
      selected_armor: null,
      dialog_open: false,
      loading: true
    };
  }

  componentWillMount() {
    api.getEquipment((success, response) => {
      if (success) {
        const armors = _.filter(response.content, { equipment_category: 'Armor' });
        this.setState({ armors: _.sortBy(armors, ['name']), loading: false });
      }
    });
  }

  render() {
    let rendered_armors = null;
    if (this.state.name_filter || this.state.category_filter || this.state.strength_filter || this.state.stealth_filter)
      rendered_armors = this.renderFilteredArmor();
    else
      rendered_armors = this.renderAllArmor();

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>

          <Grid centered stackable>

            <Grid.Row verticalAlign='top'>
              <Grid.Column width={8} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                <div className='pt-input-group pt-fill'>
                  <span className='pt-icon pt-icon-search'></span>
                  <input type='text' className='pt-input' placeholder='Filter Armor'
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
                          <th className='text-center'>Armor Class</th>
                          { !utils.isMobile() ? <th className='text-center'>Min. Strength</th> : null }
                          { !utils.isMobile() ? <th className='text-center'>Stealth</th> : null }
                        </tr>
                      </thead>
                      <tbody>
                        { rendered_armors }
                      </tbody>
                    </table>
                }
              </Grid.Column>
            </Grid.Row>

          </Grid>

          { this.renderArmorModal() }

        </InnerContainer>
      </OuterContainer>
    );
  }

  createArmorList = (armors) => {
    return _.map(armors, (armor) => {
      const ac =
        <span className='no-icon'>
          {armor.armor_class.base +
          (armor.armor_class.dex_bonus ? ' + dex. modifier' : '') +
          (armor.armor_class.max_bonus ? ' (max ' + armor.armor_class.max_bonus + ')' : '')}
        </span>;

      return (
        <tr key={armor.index} onClick={() => { this.setState({ selected_armor: armor, dialog_open: true }) }}>
          <td>{ armor.name }</td>
          <td>{ armor.armor_category }</td>
          <td>{ ac }</td>
          { !utils.isMobile() ? <td>{ armor.str_minimum || '-' }</td> : null }
          { !utils.isMobile() ? <td>{ armor.stealth_disadvantage ? 'Disadvantage' : '' }</td> : null }
        </tr>
      );
    });
  }

  renderArmorModal = () => {
    const armor = this.state.selected_armor;
    return (
      <Dialog isOpen={this.state.dialog_open} title={armor ? armor.name : null}
              onClose={() => this.setState({ selected_armor: null, dialog_open: false })}>
        <div className='pt-dialog-body'>
          <ArmorDetails armor={armor} />
        </div>
        <div className='pt-dialog-footer'>
          <div className='pt-dialog-footer-actions'>
            <Button onClick={() => this.setState({ selected_armor: null, dialog_open: false })} text='Close' />
          </div>
        </div>
      </Dialog>
    );
  }

  renderAllArmor = () => {
    return this.createArmorList(this.state.armors);
  }

  renderFilteredArmor = () => {
    let filtered_armors = this.state.armors;

    if (this.state.name_filter)
      filtered_armors = _.filter(filtered_armors, (armor) => {
        return armor.name.toLowerCase().indexOf(this.state.name_filter.toLowerCase()) > -1;
      });

    if (this.state.category_filter)
      filtered_armors = _.filter(filtered_armors, { armor_category: this.state.category_filter });

    if (this.state.stealth_filter)
      filtered_armors = _.filter(filtered_armors, (armor) => {
        return this.state.stealth_filter === 'Yes' ? armor.stealth_disadvantage : !armor.stealth_disadvantage;
      });

    if (this.state.strength_filter)
    filtered_armors = _.filter(filtered_armors, (armor) => {
      return this.state.strength_filter === 'Yes' ? armor.str_minimum > 0: armor.str_minimum === 0;
    });

    return this.createArmorList(filtered_armors);
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
                    <option>Light</option>
                    <option>Medium</option>
                    <option>Heavy</option>
                    <option>Shield</option>
                  </select>
                </div>
                <div className='pt-form-helper-text'>Armor Category</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingRight: '0.5rem', paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <div className='pt-select pt-fill'>
                  <select onChange={(event) => this.setState({ strength_filter: event.target.value })}>
                    <option value=''>All</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className='pt-form-helper-text'>Minimum Strength</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingRight: '0.5rem', paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <div className='pt-select pt-fill'>
                  <select onChange={(event) => this.setState({ stealth_filter: event.target.value })}>
                    <option value=''>All</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className='pt-form-helper-text'>Stealth Disadvantage</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
