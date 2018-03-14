import React, { Component } from 'react';
import { Intent, NumericInput, Popover, Position, Toaster, Tooltip } from '@blueprintjs/core';
import _ from 'lodash';
import api from '../../../lib/api';
import { isMobile } from '../../../lib/utils';

export default class WeaponsTreeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

            <span className='pt-tree-node-label' style={{ marginLeft: '0.75rem' }}>
              <Popover position={isMobile() ? Position.TOP_LEFT : Position.TOP}>
                <span style={{ cursor: 'pointer' }}>{ele.name}</span>
                <div className='item-amount-popover'>
                  <span>Custom Description:</span>
                  <textarea rows='4' value={ele.desc}
                            className='pt-input pt-fill' type='text'
                            onChange={(event) => {
                              ele.desc = event.target.value;
                              this.forceUpdate();
                            }}
                            style={{ marginTop: '0.25rem' }}>
                  </textarea>
                  <div className='text-center' style={{ marginTop: '0.5rem', marginBottom: '-10px' }}>
                    <button className='pt-button pt-intent-success pt-minimal'
                            onClick={this.save}>Save</button>
                  </div>
                </div>
              </Popover>
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
                            onClick={this.save}>Save</button>
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

  save = () => {
    // See {EquipmentTreeDisplay} for details of the following implementation.
    api.updateCharacter({ id: this.props.character.id, weapons: this.state.content }, (success, response) => {
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
