import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Button, Intent, Position, Tooltip } from '@blueprintjs/core';
import _ from 'lodash';
import api from '../../../lib/api';

export default class ArmorDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      armor: null,
      editing_desc: false,
      saving_desc: false
    }

    api.getEquipment((success, response) => {
      if (success) {
        const armor = _.find(response.content, { name: props.armor.name });
        if (armor) this.setState({ armor });
        else this.setState({ armor: {} });
      }
    });
  }

  render() {
    if (this.state.armor === null) return null;

    return (
      <Grid stackable centered>

        {
          !this.props.armor.custom ?
          <Grid.Row>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Category</div>
              <div className='spell-detail-value'>{ this.state.armor.armor_category || 'N/A' }</div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Armor Class</div>
              <div className='spell-detail-value'>
                {
                  !!this.state.armor.armor_class ?
                  this.state.armor.armor_class.base + (this.state.armor.armor_class.dex_bonus ? ' + dexterity modifier' : '')
                  + (this.state.armor.armor_class.max_bonus ? ' (max ' + this.state.armor.armor_class.max_bonus + ')' : '')
                  : 'N/A'
                }
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Stealth Disadvantage</div>
              <div className='spell-detail-value'>{ this.state.armor.stealth_disadvantage ? 'yes' : 'no' }</div>
            </Grid.Column>
          </Grid.Row>
          : null
        }

        {
          !this.props.armor.custom ?
          <Grid.Row>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Minimum Strength</div>
              <div className='spell-detail-value'>{ this.state.armor.str_minimum || '0' }
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Price</div>
              <div className='spell-detail-value'>
                {
                  this.state.armor.cost ?
                  this.state.armor.cost.quantity + ' ' + this.state.armor.cost.unit
                  : 'N/A'
                }
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className='spell-detail-label'>Weight</div>
              <div className='spell-detail-value'>
                {
                  this.state.armor.weight ?
                  this.state.armor.weight + ' lb.'
                  : 'N/A'
                }
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
                    onChange={(event) => this.props.armor.desc = event.target.value}
                    defaultValue={this.props.armor.desc}>
          </textarea>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Button intent={Intent.PRIMARY} onClick={this.saveDesc} loading={this.state.saving_desc}>Save</Button>
          </div>
        </div>
      );

    return (
      <Tooltip content={'Click to edit'} position={Position.TOP}>
        <div style={{ cursor: 'pointer', whiteSpace: 'pre-wrap' }} onClick={() => this.setState({ editing_desc: true })}>
          { this.props.armor.desc || 'None' }
        </div>
      </Tooltip>
    );
  }

  saveDesc = () => {
    this.setState({ saving_desc: true });
    api.updateCharacter({ id: this.props.id, armor: this.props.armors }, (success, response) => {
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
