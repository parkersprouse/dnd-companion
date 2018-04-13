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
      to: 'table',
      messages: [],
      players: []
    };
  }

  componentWillMount() {
    for (let i = 0; i < this.props.game.user_ids.length; i++) {
      api.getUserBy({ id: this.props.game.user_ids[i]}, (success, response) => {
        if (success)
          this.state.players.push(response.content);
        this.forceUpdate();
      });
    }

    this.socket = socketIOclient(constants.server);
    this.socket.emit('join game', { user: this.props.user.username, game: this.props.game.id });

    this.socket.on('get message', msg => {
      if (msg.to === 'group' && this.props.user_is_dm) return;
      if (msg.to !== 'group' && msg.to !== 'table' &&
          msg.to !== this.props.user.username && msg.user !== this.props.user.username) return;
      this.state.messages.push(msg);
      this.forceUpdate();
    });

    window.onbeforeunload = () => {
      this.socket.emit('leave game', { user: this.props.user.username, game: this.props.game.id });
    };
  }

  render() {
    const render_msgs = this.state.messages.map((msg, index) => {
      let msg_class = 'chat-msg-private';
      if (msg.to === 'group') msg_class = 'chat-msg-group';
      else if (msg.to === 'table') msg_class = 'chat-msg-table';
      return <div key={index} className={msg_class}>[{msg.user}]: {msg.text}</div>
    });

    return (
      <div className='pt-card'>
        <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #ccc' }}>
          { render_msgs }
        </div>
        <form onSubmit={this.submitMessage}>
          <div className='pt-control-group'>
            <div className='pt-select'>
              <select value={this.state.to} onChange={this.onInputChange} name='to'>
                <option value='table'>Table</option>
                {
                  this.props.user_is_dm ? null :
                  <option value='group'>Group</option>
                }
                { this.renderPrivateMessageOptions() }
              </select>
            </div>
            <input type='text' className='pt-input pt-fill'
                   placeholder='Enter Message...' name='msg' value={this.state.msg}
                   onChange={this.onInputChange} />
            <button className='pt-button pt-intent-primary' type='submit'>Send</button>
          </div>
        </form>
      </div>
    );
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderPrivateMessageOptions = () => {
    const ordered_players = _.sortBy(this.state.players, 'username');
    const players = [];
    ordered_players.forEach(player => {
      if (player.username !== this.props.user.username)
        players.push(<option>{ player.username }</option>);
    });
    return players;
  }

  submitMessage = (e) => {
    e.preventDefault();
    if (!this.state.msg) return null;

    console.log(this.state.msg);
    this.socket.emit('send message', { text: this.state.msg, user: this.props.user.username, to: this.state.to });
    this.setState({ msg: '' });
  }
}
