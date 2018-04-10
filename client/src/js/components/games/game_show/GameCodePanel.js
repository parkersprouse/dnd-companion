import React, { Component } from 'react';
import { Grid, Item } from 'semantic-ui-react';
import { Button, Dialog, Intent, Position, Toaster, Tooltip } from '@blueprintjs/core';
import api from '../../../lib/api';
import utils from '../../../lib/utils';
import _ from 'lodash';

export default class GameCodePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      dialog_open: false
    }
  }

  render() {
    return (
      <div>
        Game Code: <Tooltip content='Click to invite a player' position={Position.TOP}>
                     <span onClick={this.toggleDialog} style={{ fontWeight: 'bold', cursor: 'pointer' }}>
                       { this.props.code }
                     </span>
                   </Tooltip>
        { this.renderInviteModal() }
      </div>
    );
  }

  renderInviteModal = () => {
    return (
      <Dialog isOpen={this.state.dialog_open} title={'Invite Player'}
              onClose={() => this.setState({ selected_spell: null, dialog_open: false })}>
        <div className='pt-dialog-body'>
          <div className='pt-form-group' style={{ margin: '0' }}>
            <div className='pt-form-content'>
              <input id='email' className='pt-input pt-fill' placeholder='E-mail'
                     onChange={(e) => this.setState({ email: e.target.value })} />
            </div>
          </div>
        </div>
        <div className='pt-dialog-footer'>
          <div className='pt-dialog-footer-actions'>
            <Button text='Close' onClick={this.toggleDialog} />
            <Button text='Send' intent={Intent.PRIMARY} onClick={this.send} disabled={!this.state.email} />
          </div>
        </div>
      </Dialog>
    );
  }

  showSuccess() {
    Toaster.create().show({
      message: 'E-mail Successfully Sent',
      position: Position.TOP_CENTER,
      intent: Intent.SUCCESS,
      timeout: 2000
    });
  }

  send = () => {
    if (!this.state.email) return null;
    api.sendGameInvite({ email: this.state.email, code: this.props.code }, (success, response) => {
      this.showSuccess();
    });
  }

  toggleDialog = () => {
    this.setState({ dialog_open: !this.state.dialog_open });
  }
}
