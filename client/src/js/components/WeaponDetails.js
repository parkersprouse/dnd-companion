import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';

export default class WeaponDetails extends Component {
  render() {
    if (this.props.weapon === null) return null;

    const category = this.props.weapon.weapon_category || 'N/A';

    let range = 'N/A';
    if (this.props.weapon.weapon_range) {
      range = this.props.weapon.weapon_range;
      if (range === 'Ranged' && this.props.weapon.ammo_range)
        range += ': ' + this.props.weapon.ammo_range.normal + '/' + this.props.weapon.ammo_range.long

      if (this.props.weapon.throw_range)
        range += '\nThrown: ' + this.props.weapon.throw_range.normal + '/' + this.props.weapon.throw_range.long;
    }

    let damage = 'N/A';
    if(this.props.weapon.damage && this.props.weapon.damage.damage_type)
      if (this.props.weapon.damage.dice_value === 0)
        damage = this.props.weapon.damage.dice_count + ' ' + this.props.weapon.damage.damage_type.name;
      else
        damage = this.props.weapon.damage.dice_count + 'd' + this.props.weapon.damage.dice_value + ' ' + this.props.weapon.damage.damage_type.name;

    let properties = 'N/A';
    if (this.props.weapon.properties && this.props.weapon.properties.length > 0)
      properties = _.join(_.map(this.props.weapon.properties, (w) => w.name), ', ')

    let cost = 'N/A';
    if (this.props.weapon.cost)
      cost = this.props.weapon.cost.quantity + ' ' + this.props.weapon.cost.unit;

    let weight = 'N/A';
    if (this.props.weapon.weight)
      weight = this.props.weapon.weight + ' lb.';

    let special = null;
    if (this.props.weapon.special)
      special = _.map(this.props.weapon.special, (e) => <div>{e}</div>)

    return (
      <Grid stackable centered>

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

        {
          special ?
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

      </Grid>
    );
  }
}
