import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Button, Intent, Position, Tooltip } from '@blueprintjs/core';
import _ from 'lodash';
import api from '../../../lib/api';

export default class CustomArmorDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      equipment: null,
      editing_desc: false,
      saving_desc: false
    }

    api.getEquipment((success, response) => {
      if (success) {
        const equipment = _.find(response.content, { name: props.equipment.name });
        if (equipment) this.setState({ equipment });
        else this.setState({ equipment: {} });
      }
    });
  }

  render() {
    if (this.state.equipment === null) return null;

    return (
      <Grid stackable centered>

        {
          !this.props.equipment.custom ?
          <Grid.Row>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Category</div>
              <div className='spell-detail-value' style={{ whiteSpace: 'pre-wrap' }}>
                {
                  (this.state.equipment.equipment_category +
                    (this.state.equipment.gear_category ? '\n' + this.state.equipment.gear_category : '') +
                    (this.state.equipment.tool_category ? '\n' + this.state.equipment.tool_category : '') +
                    (this.state.equipment.vehicle_category ? '\n' + this.state.equipment.vehicle_category : '')
                  ) || 'N/A'
                }
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Price</div>
              <div className='spell-detail-value'>
                {
                  this.state.equipment.cost ?
                  this.state.equipment.cost.quantity + ' ' + this.state.equipment.cost.unit
                  : 'N/A'
                }
              </div>
            </Grid.Column>
            {
              this.state.equipment.capacity ?
              <Grid.Column width={5}>
                <div className='spell-detail-label'>Capacity</div>
                <div className='spell-detail-value'>
                  {
                    this.state.equipment.capacity ?
                    this.state.equipment.capacity
                    : 'N/A'
                  }
                </div>
              </Grid.Column>
              :
              <Grid.Column width={5}>
                <div className='spell-detail-label'>Weight</div>
                <div className='spell-detail-value'>
                  {
                    this.state.equipment.weight ?
                    this.state.equipment.weight + ' lb.'
                    : 'N/A'
                  }
                </div>
              </Grid.Column>
            }

          </Grid.Row>
          : null
        }

        {
          !this.props.equipment.custom && this.state.equipment.speed ?
          <Grid.Row>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Speed</div>
              <div className='spell-detail-value'>
                {
                  this.state.equipment.speed ?
                  this.state.equipment.speed.quantity + ' ' + this.state.equipment.speed.unit
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
          !this.props.equipment.custom && this.state.equipment.desc ?
          <Grid.Row>
            <Grid.Column width={15}>
              <div className='spell-detail-label'>Description</div>
              <div className='spell-detail-value'>
                { _.map(this.state.equipment.desc, (d) => <div>{d}</div>) }
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
                    onChange={(event) => this.props.equipment.desc = event.target.value}
                    defaultValue={this.props.equipment.desc}>
          </textarea>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Button intent={Intent.PRIMARY} onClick={this.saveDesc} loading={this.state.saving_desc}>Save</Button>
          </div>
        </div>
      );

    return (
      <Tooltip content={'Click to edit'} position={Position.TOP}>
        <div style={{ cursor: 'pointer', whiteSpace: 'pre-wrap' }} onClick={() => this.setState({ editing_desc: true })}>
          { this.props.equipment.desc || 'None' }
        </div>
      </Tooltip>
    );
  }

  saveDesc = () => {
    this.setState({ saving_desc: true });
    api.updateCharacter({ id: this.props.id, equipment: this.props.equipments }, (success, response) => {
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
