import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import { Dialog, Button } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import EquipmentDetails from '../components/EquipmentDetails';
import api from '../lib/api';
import _ from 'lodash';

export default class EquipmentSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipments: null,
      name_filter: '',
      category_filter: '',
      subcategory_filter: '',
      selected_equipment: null,
      dialog_open: false,
      loading: true
    };
  }

  componentWillMount() {
    api.getEquipment((success, response) => {
      if (success) {
        const equipments = _.reject(response.content,
          (e) => e.equipment_category === 'Armor' || e.equipment_category === 'Weapon');
        this.setState({ equipments: _.sortBy(equipments, ['name']), loading: false });
      }
    });
  }

  render() {
    let rendered_equipments = null;
    if (this.state.name_filter || this.state.category_filter || this.state.subcategory_filter)
      rendered_equipments = this.renderFilteredEquipment();
    else
      rendered_equipments = this.renderAllEquipment();

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>

          <Grid centered stackable>

            <Grid.Row verticalAlign='top'>
              <Grid.Column width={8} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                <div className='pt-input-group pt-fill'>
                  <span className='pt-icon pt-icon-search'></span>
                  <input type='text' className='pt-input' placeholder='Filter Equipment'
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
                          <th className='text-center'>Subcategory</th>
                        </tr>
                      </thead>
                      <tbody>
                        { rendered_equipments }
                      </tbody>
                    </table>
                }
              </Grid.Column>
            </Grid.Row>

          </Grid>

          { this.renderEquipmentModal() }

        </InnerContainer>
      </OuterContainer>
    );
  }

  createEquipmentList = (equipments) => {
    return _.map(equipments, (equipment) => {

      let subcat = 'N/A';
      if (!!equipment.gear_category) subcat = equipment.gear_category;
      else if (!!equipment.tool_category) subcat = equipment.tool_category;
      else if (!!equipment.vehicle_category) subcat = equipment.vehicle_category;

      return (
        <tr key={equipment.index} onClick={() => { this.setState({ selected_equipment: equipment, dialog_open: true }) }}>
          <td>{ equipment.name }</td>
          <td>{ equipment.equipment_category }</td>
          <td>{ subcat }</td>
        </tr>
      );
    });
  }

  renderEquipmentModal = () => {
    const equipment = this.state.selected_equipment;
    return (
      <Dialog isOpen={this.state.dialog_open} title={equipment ? equipment.name : null}
              onClose={() => this.setState({ selected_equipment: null, dialog_open: false })}>
        <div className='pt-dialog-body'>
          <EquipmentDetails equipment={equipment} />
        </div>
        <div className='pt-dialog-footer'>
          <div className='pt-dialog-footer-actions'>
            <Button onClick={() => this.setState({ selected_equipment: null, dialog_open: false })} text='Close' />
          </div>
        </div>
      </Dialog>
    );
  }

  renderAllEquipment = () => {
    return this.createEquipmentList(this.state.equipments);
  }

  renderFilteredEquipment = () => {
    let filtered_equipments = this.state.equipments;

    if (this.state.name_filter)
      filtered_equipments = _.filter(filtered_equipments, (equipment) => {
        return equipment.name.toLowerCase().indexOf(this.state.name_filter.toLowerCase()) > -1;
      });

    if (this.state.category_filter)
      filtered_equipments = _.filter(filtered_equipments, { equipment_category: this.state.category_filter });

    if (this.state.subcategory_filter)
    filtered_equipments = _.filter(filtered_equipments, (equipment) => {
      if (equipment.gear_category) return equipment.gear_category === this.state.subcategory_filter;
      else if (equipment.tool_category) return equipment.tool_category === this.state.subcategory_filter;
      else if (equipment.vehicle_category) return equipment.vehicle_category === this.state.subcategory_filter;
    });

    return this.createEquipmentList(filtered_equipments);
  }

  renderFilterDropdowns = () => {
    return (
      <Grid centered>
        <Grid.Row verticalAlign='top'>
          <Grid.Column width={8} style={{ paddingRight: '0.5rem', paddingLeft: '1rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <div className='pt-select pt-fill'>
                  <select onChange={(event) => this.setState({ category_filter: event.target.value })}>
                    <option value=''>All</option>
                    <option>Adventuring Gear</option>
                    <option>Mounts and Vehicles</option>
                    <option>Tools</option>
                  </select>
                </div>
                <div className='pt-form-helper-text'>Equipment Category</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={8} style={{ paddingRight: '0.5rem', paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <div className='pt-select pt-fill'>
                  <select onChange={(event) => this.setState({ subcategory_filter: event.target.value })}>
                    <option value=''>All</option>
                    <option>Ammunition</option>
                    <option>Arcane focus</option>
                    <option>Artisan's Tools</option>
                    <option>Druidic focus</option>
                    <option>Equipment Pack</option>
                    <option>Gaming Sets</option>
                    <option>Holy Symbol</option>
                    <option>Kit</option>
                    <option>Mounts and Other Animals</option>
                    <option>Musical Instrument</option>
                    <option>Other Tools</option>
                    <option>Standard Gear</option>
                    <option>Tack, Harness, and Drawn Vehicles</option>
                    <option>Waterborne Vehicles</option>
                  </select>
                </div>
                <div className='pt-form-helper-text'>Equipment Subcategory</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
