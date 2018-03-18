import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class ArmorDetails extends Component {
  render() {
    if (this.props.armor === null) return null;

    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Category</div>
            <div className='spell-detail-value'>{ this.props.armor.armor_category || 'N/A' }</div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Armor Class</div>
            <div className='spell-detail-value'>
              {
                !!this.props.armor.armor_class ?
                this.props.armor.armor_class.base + (this.props.armor.armor_class.dex_bonus ? ' + dexterity modifier' : '')
                + (this.props.armor.armor_class.max_bonus ? ' (max ' + this.props.armor.armor_class.max_bonus + ')' : '')
                : 'N/A'
              }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Stealth Disadvantage</div>
            <div className='spell-detail-value'>{ this.props.armor.stealth_disadvantage ? 'yes' : 'no' }</div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Minimum Strength</div>
            <div className='spell-detail-value'>{ this.props.armor.str_minimum || '0' }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Price</div>
            <div className='spell-detail-value'>
              {
                this.props.armor.cost ?
                this.props.armor.cost.quantity + ' ' + this.props.armor.cost.unit
                : 'N/A'
              }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Weight</div>
            <div className='spell-detail-value'>
              {
                this.props.armor.weight ?
                this.props.armor.weight + ' lb.'
                : 'N/A'
              }
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
