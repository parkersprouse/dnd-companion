import React, { Component } from 'react';
import { Button, Dialog, Intent, NumericInput, Popover, Position, Toaster, Tooltip } from '@blueprintjs/core';
import _ from 'lodash';
import api from '../../../lib/api';
import { isMobile } from '../../../lib/utils';
import CustomArmorDetails from './CustomArmorDetails';

export default class ArmorTreeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown_armor: null,
      content: props.content && props.content.length > 0 ?
      _.sortBy(props.content, (i) => i.name ? i.name : i) : []
    }
  }

  componentWillReceiveProps(next_props) {
    this.setState({
      content: next_props.content && next_props.content.length > 0 ?
      _.sortBy(next_props.content, (i) => i.name ? i.name : i) : []
    });
  }

  render() {
    const content = this.renderContent();
    return (
      <div className='pt-tree pt-elevation-0'>
        <ul className='pt-tree-node-list pt-tree-root'>
          {
            content.length > 0 ? content :
            <li className='pt-tree-node'>
              <div className='pt-tree-node-content'>
                <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}><i>None</i></span>
              </div>
            </li>
          }
        </ul>
        { this.renderShowArmorDialog() }
      </div>
    );
  }

  renderContent = () => {
    return _.map(this.state.content, (ele, index) => {
      return (
        <li key={index} className='pt-tree-node text-left'>
          <div className='pt-tree-node-content'>

            <span className='pt-tree-node-icon pt-icon-standard' style={{ marginRight: '0', marginLeft: '10px' }}>
              <Tooltip content={ele.equipped ? 'Equipped' : 'Not Equipped'} position={Position.TOP}>
                <label className='pt-control pt-switch' style={{ marginBottom: '0', paddingLeft: '26px', marginTop: '0' }}>
                  <input type='checkbox' checked={ele.equipped} onChange={() => this.toggleEquipped(ele)} />
                  <span className='pt-control-indicator'></span>
                </label>
              </Tooltip>
            </span>

            <span className='pt-tree-node-label' style={{ marginLeft: '0.75rem', cursor: 'pointer' }}
                  onClick={() => this.setState({ shown_armor: ele })}>
              {ele.name}
            </span>

            <span className='pt-tree-node-secondary-label'>
              <Popover position={isMobile() ? Position.TOP_RIGHT : Position.TOP}>
                <span className='item-list-amount'>x{ele.amount}</span>
                <div className='item-amount-popover'>
                  <span>Amount:</span>
                  <NumericInput value={ele.amount} onValueChange={(num, str) => {
                    ele.amount = num;
                  }} min={1} className='pt-fill' />
                  <div className='text-center' style={{ marginTop: '0.5rem', marginBottom: '-10px' }}>
                    <button className='pt-button pt-intent-success pt-minimal'
                            onClick={() => this.save()}>Save</button>
                  </div>
                </div>
              </Popover>
              <a onClick={() => this.props.remove(ele)} className='remove-item-btn'>
                <span className='pt-icon-cross'></span>
              </a>
            </span>

          </div>
        </li>
      );
    });
  }

  renderShowArmorDialog = () => {
    return (
      <Dialog isOpen={!!this.state.shown_armor} onClose={() => this.setState({ shown_armor: null })}
              title={this.state.shown_armor ? this.state.shown_armor.name : ''}>
        <div className='pt-dialog-body'>
          <CustomArmorDetails armor={this.state.shown_armor}
                         id={this.props.character.id}
                         armors={this.state.content}
                         setRootState={this.props.setRootState}
                         showErrorToast={this.showErrorToast}
                         showSuccessToast={this.showSuccessToast} />
        </div>
        <div className='pt-dialog-footer'>
          <div className='pt-dialog-footer-actions'>
            <Button text='Close' onClick={() => this.setState({ shown_armor: null })} />
          </div>
        </div>
      </Dialog>
    );
  }

  save = () => {
    // See {EquipmentTreeDisplay} for details of the following implementation.
    api.updateCharacter({ id: this.props.character.id, armor: this.state.content }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.forceUpdate();
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        this.showErrorToast();
    });
  }

  showErrorToast = () => {
    Toaster.create().show({
      message: 'Failed to update',
      position: Position.TOP_CENTER,
      intent: Intent.DANGER,
      timeout: 2000
    });
  }

  showSuccessToast = () => {
    Toaster.create().show({
      message: 'Successfully Updated',
      position: Position.TOP_CENTER,
      intent: Intent.SUCCESS,
      timeout: 2000
    });
  }

  toggleEquipped = (ele) => {
    ele.equipped = !ele.equipped;
    this.save();
  }

}
