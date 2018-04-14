import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import api from '../../../lib/api';
import constants from '../../../lib/constants';
import _ from 'lodash';
import socketIOclient from 'socket.io-client';

export default class ChatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      to: 'table',
      messages: [],
      players: [],
      online_players: []
    };

    this.to_options = ['group', 'table', 'system'];
  }

  componentWillMount() {
    for (let i = 0; i < this.props.game.user_ids.length; i++) {
      api.getUserBy({ id: this.props.game.user_ids[i]}, (success, response) => {
        if (success)
          this.state.players.push(response.content);
        this.forceUpdate();
      });
    }
    this.configureSockets();
  }

  render() {
    const render_msgs = this.state.messages.map((msg, index) => {
      let msg_class = 'chat-msg-private';
      if (msg.to === 'group') msg_class = 'chat-msg-group';
      else if (msg.to === 'table') msg_class = 'chat-msg-table';
      else if (msg.to === 'system') msg_class = '';

      let to = null;
      if (this.to_options.indexOf(msg.to) === -1)
        if (msg.to === this.props.user.username)
          to = `[from ${msg.user.username}]: `;
        else
          to = `[to ${msg.to}]: `;
      else if (msg.to !== 'system')
        to = `[${msg.user.username}]: `;

      return (
        <div key={ index } className={ 'no-icon ' + msg_class }>
          { to }{ msg.text }
        </div>
      );
    });

    const online_players = this.state.online_players.map((user, index) => {
      return (
        <div key={ index } className='no-icon'>
          { user }
        </div>
      );
    });

    return (
      <div className='pt-card' style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #ccc', maxHeight: '400px', overflowY: 'auto' }}>
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
            <button className='pt-button pt-intent-primary pt-icon-key-enter' type='submit'></button>
          </div>
        </form>
        <div style={{ marginTop: '0.5rem' }}>
          <Grid stackable centered>
            <Grid.Row>
              <Grid.Column width={8} style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '0.25rem', paddingBottom: '0.25rem', borderBottom: '1px solid #ccc' }}>Key</div>
                <div className='chat-msg-private'>Private</div>
                <div className='chat-msg-group'>Group</div>
                <div className='chat-msg-table'>Table</div>
              </Grid.Column>
              <Grid.Column width={8} style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '0.25rem', paddingBottom: '0.25rem', borderBottom: '1px solid #ccc' }}>Currently Online</div>
                { online_players }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }

  configureSockets = () => {
    this.socket = socketIOclient(constants.server);
    this.socket.emit('join game', { user: this.props.user, game: this.props.game.id });

    this.socket.on('join game', online_players => this.setState({ online_players }));
    this.socket.on('leave game', online_players => this.setState({ online_players }));

    this.socket.on('get message', msg => {
      if (msg.to === 'group' && this.props.user_is_dm)
        return;
      if (this.to_options.indexOf(msg.to) === -1 && msg.to !== this.props.user.username && msg.user.username !== this.props.user.username)
        return;
      this.state.messages.push(msg);
      this.forceUpdate();
    });

    window.onbeforeunload = () => {
      this.socket.emit('leave game', { user: this.props.user, game: this.props.game.id });
    }
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderPrivateMessageOptions = () => {
    const ordered_players = _.sortBy(this.state.players, 'username');
    const players = [];
    ordered_players.forEach((player, index) => {
      if (player.username !== this.props.user.username)
        players.push(<option key={index}>{ player.username }</option>);
    });
    return players;
  }

  submitMessage = (e) => {
    e.preventDefault();
    if (!this.state.msg) return null;
    this.socket.emit('send message', { text: this.state.msg, user: this.props.user, to: this.state.to });
    this.setState({ msg: '' });
  }
}
