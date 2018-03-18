import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';

export default class ArmorDetails extends Component {
  render() {
    if (this.props.equipment === null) return null;

    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Category</div>
            <div className='spell-detail-value' style={{ whiteSpace: 'pre-wrap' }}>
              {
                (this.props.equipment.equipment_category +
                  (this.props.equipment.gear_category ? '\n' + this.props.equipment.gear_category : '') +
                  (this.props.equipment.tool_category ? '\n' + this.props.equipment.tool_category : '') +
                  (this.props.equipment.vehicle_category ? '\n' + this.props.equipment.vehicle_category : '')
                ) || 'N/A'
              }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Price</div>
            <div className='spell-detail-value'>
              {
                this.props.equipment.cost ?
                this.props.equipment.cost.quantity + ' ' + this.props.equipment.cost.unit
                : 'N/A'
              }
            </div>
          </Grid.Column>
          {
            this.props.equipment.capacity ?
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Capacity</div>
              <div className='spell-detail-value'>
                {
                  this.props.equipment.capacity ?
                  this.props.equipment.capacity
                  : 'N/A'
                }
              </div>
            </Grid.Column>
            :
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Weight</div>
              <div className='spell-detail-value'>
                {
                  this.props.equipment.weight ?
                  this.props.equipment.weight + ' lb.'
                  : 'N/A'
                }
              </div>
            </Grid.Column>
          }

        </Grid.Row>

        {
          this.props.equipment.speed ?
          <Grid.Row>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Speed</div>
              <div className='spell-detail-value'>
                {
                  this.props.equipment.speed ?
                  this.props.equipment.speed.quantity + ' ' + this.props.equipment.speed.unit
                  : 'N/A'
                }
              </div>
            </Grid.Column>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column width={5}></Grid.Column>
          </Grid.Row>
          : null
        }

        {
          this.props.equipment.desc ?
          <Grid.Row>
            <Grid.Column width={15}>
              <div className='spell-detail-label'>Description</div>
              <div className='spell-detail-value'>
                { _.map(this.props.equipment.desc, (d) => <div>{d}</div>) }
              </div>
            </Grid.Column>
          </Grid.Row>
          : null
        }

      </Grid>
    );
  }
}
