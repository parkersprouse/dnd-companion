import React, { Component } from 'react';
import { Position, Popover, NumericInput, Toaster, Intent } from '@blueprintjs/core';
import _ from 'lodash';
import api from '../../../lib/api';
import { isMobile } from '../../../lib/utils';

export default class EquipmentTreeDisplay extends Component {
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
        <li key={index} className='pt-tree-node'>
          <div className='pt-tree-node-content'>

            <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>
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
    // After trying this, I learned that any time an individual element is changed,
    // it's changed directly in the `this.state.content` reference as well, so
    // there's no need to manually update the `this.state.content` object.
    // I don't know if I like that yet, but it's how the rest of the app is
    // currently built, so I'll run with it for the time being.

    // const equipment = this.state.content;
    // equipment.splice(equipment.indexOf(_.find(equipment, { name: ele.name })), 1);
    // equipment.push(ele);
    api.updateCharacter({ id: this.props.character.id, equipment: this.state.content }, (success, response) => {
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
}
