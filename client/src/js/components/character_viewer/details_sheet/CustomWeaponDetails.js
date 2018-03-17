import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Button, Intent, Position, Tooltip } from '@blueprintjs/core';
import _ from 'lodash';
import api from '../../../lib/api';

export default class CustomWeaponDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weapon: null,
      editing_desc: false,
      saving_desc: false
    }

    api.getEquipment((success, response) => {
      if (success) {
        const weapon = _.find(response.content, { name: props.weapon.name });
        if (weapon) this.setState({ weapon });
        else this.setState({ weapon: {} });
      }
    });
  }

  render() {
    if (this.state.weapon === null) return null;

    const category = this.state.weapon.weapon_category || 'N/A';

    let range = 'N/A';
    if (this.state.weapon.weapon_range) {
      range = this.state.weapon.weapon_range;
      if (range === 'Ranged' && this.state.weapon.ammo_range)
        range += ': ' + this.state.weapon.ammo_range.normal + '/' + this.state.weapon.ammo_range.long

      if (this.state.weapon.throw_range)
        range += '\nThrown: ' + this.state.weapon.throw_range.normal + '/' + this.state.weapon.throw_range.long;
    }

    let damage = 'N/A';
    if(this.state.weapon.damage && this.state.weapon.damage.damage_type)
      if (this.state.weapon.damage.dice_value === 0)
        damage = this.state.weapon.damage.dice_count + ' ' + this.state.weapon.damage.damage_type.name;
      else
        damage = this.state.weapon.damage.dice_count + 'd' + this.state.weapon.damage.dice_value + ' ' + this.state.weapon.damage.damage_type.name;

    let properties = 'N/A';
    if (this.state.weapon.properties)
      properties = _.join(_.map(this.state.weapon.properties, (w) => w.name), ', ')

    let cost = 'N/A';
    if (this.state.weapon.cost)
      cost = this.state.weapon.cost.quantity + ' ' + this.state.weapon.cost.unit;

    let weight = 'N/A';
    if (this.state.weapon.weight)
      weight = this.state.weapon.weight + ' lb.';

    let special = null;
    if (this.state.weapon.special)
      special = _.map(this.state.weapon.special, (e) => <div>{e}</div>)

    return (
      <Grid stackable centered>

        {
          !this.props.weapon.custom ?
          <Grid.Row>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Category</div>
              <div className='spell-detail-value'>{ category }</div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Range</div>
              <div className='spell-detail-value' style={{ whiteSpace: 'pre-wrap' }}>{ range }</div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Damage</div>
              <div className='spell-detail-value'>{ damage }</div>
            </Grid.Column>
          </Grid.Row>
          : null
        }

        {
          !this.props.weapon.custom ?
          <Grid.Row>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Properties</div>
              <div className='spell-detail-value'>{ properties }</div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Price</div>
              <div className='spell-detail-value'>{ cost }</div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Weight</div>
              <div className='spell-detail-value'>{ weight }</div>
            </Grid.Column>
          </Grid.Row>
          : null
        }

        {
          !this.props.weapon.custom && special ?
          <Grid.Row>
            <Grid.Column width={15}>
              <div className='spell-detail-label'>Special Properties</div>
              <div className='spell-detail-value'>
                { special }
              </div>
            </Grid.Column>
          </Grid.Row>
          : null
        }

        <Grid.Row>
          <Grid.Column width={15}>
            <div className='spell-detail-label'>Custom Description / Details</div>
            <div className='spell-detail-value'>
              { this.renderDescription() }
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }

  renderDescription = () => {
    if (this.state.editing_desc)
      return (
        <div>
          <textarea name='desc' className='pt-input pt-fill' rows='4'
                    onChange={(event) => this.props.weapon.desc = event.target.value}
                    defaultValue={this.props.weapon.desc}>
          </textarea>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Button intent={Intent.PRIMARY} onClick={this.saveDesc} loading={this.state.saving_desc}>Save</Button>
          </div>
        </div>
      );

    return (
      <Tooltip content={'Click to edit'} position={Position.TOP}>
        <div style={{ cursor: 'pointer', whiteSpace: 'pre-wrap' }} onClick={() => this.setState({ editing_desc: true })}>
          { this.props.weapon.desc || 'None' }
        </div>
      </Tooltip>
    );
  }

  saveDesc = () => {
    this.setState({ saving_desc: true });
    api.updateCharacter({ id: this.props.id, weapons: this.props.weapons }, (success, response) => {
      if (success) {
        this.props.showSuccessToast();
        this.setState({ editing_desc: false });
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        this.props.showErrorToast();
      this.setState({ saving_desc: false });
    });
  }
}
