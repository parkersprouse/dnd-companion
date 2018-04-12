import React, { Component } from 'react';
import { Grid, Item } from 'semantic-ui-react';
import api from '../../../lib/api';
import constants from '../../../lib/constants';
import utils from '../../../lib/utils';
import _ from 'lodash';
import socketIOclient from 'socket.io-client';

export default class ChatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      messages: []
    };
  }

  componentWillMount() {
    this.socket = socketIOclient(constants.server);
    this.socket.emit('join game', { user: this.props.user.username, game: this.props.game.id });

    this.socket.on('get message', message => {
      this.state.messages.push(message);
      this.forceUpdate();
    });

    window.onbeforeunload = () => {
      console.log('goodbye')
    };
  }

  render() {
    const render_msgs = this.state.messages.map((msg, index) => {
      return <div key={index}>[{msg.user}]: {msg.text}</div>
    });

    return (
      <div className='pt-card'>
        <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #ccc' }}>
          { render_msgs }
        </div>
        <form onSubmit={this.submitMessage}>
          <div className='pt-control-group'>
            <input type='text' className='pt-input pt-fill'
                   placeholder='Enter Message...' name='msg' value={this.state.msg}
                   onChange={(e) => this.setState({ msg: e.target.value })} />
            <button className='pt-button pt-intent-primary' type='submit'>Send</button>
          </div>
        </form>
      </div>
    );
  }

  submitMessage = (e) => {
    e.preventDefault();
    if (!this.state.msg) return null;

    console.log(this.state.msg)
    this.socket.emit('send message', { text: this.state.msg, user: this.props.user.username });
    this.setState({ msg: '' })
  }
}
