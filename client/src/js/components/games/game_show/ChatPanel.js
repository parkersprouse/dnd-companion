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
      dm: null,
      players: [],
      online_players: []
    };

    this.to_options = ['group', 'table', 'system'];
  }

  componentWillMount() {
    for (let i = 0; i < this.props.game.user_ids.length; i++) {
      api.getUserBy({ id: this.props.game.user_ids[i]}, (success, response) => {
        if (success)
          this.setState({ players: this.state.players.concat([response.content]) });
      });
    }
    api.getUserBy({ id: this.props.game.owner_id}, (success, response) => {
      if (success)
        this.setState({ dm: response.content });
    });
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
        <Grid stackable centered>
          <Grid.Row>
            <Grid.Column width={11}>
              <div ref={(el) => this.msg_container = el}
                   style={{ marginBottom: '1rem',
                            padding: '0.5rem',
                            height: '300px',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            border: '1px solid #ccc',
                            borderRadius: '4px' }}>
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
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <span className='chat-msg-private'>Private</span> <span className='chat-msg-group'>Group</span> <span className='chat-msg-table'>Table</span>
              </div>
            </Grid.Column>
            <Grid.Column width={5} style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '0.25rem', paddingBottom: '0.25rem', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>Currently Online</div>
              { online_players }
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
      this.setState({ messages: this.state.messages.concat([msg]) });
      this.msg_container.scrollTop = this.msg_container.scrollHeight;
    });

    // Prevent Timeouts - doesn't work
    // setTimeout(() => {
    //   this.socket.emit('ping');
    // }, 30000);
    // Don't know if the following works
    // this.socket.on('connect_timeout', (timeout) => {
    //   console.log('timeout');
    //   console.log(timeout);
    // });
    // this.socket.on('pong', () => {
    //   console.log('got pong from server');
    // });

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
    if (this.state.dm && this.state.dm.username !== this.props.user.username)
      players.push(<option key={this.state.dm.username}>{ this.state.dm.username }</option>);
    ordered_players.forEach((player, index) => {
      if (player.username !== this.props.user.username)
        players.push(<option key={index}>{ player.username }</option>);
    });
    return players;
  }

  submitMessage = (e) => {
    e.preventDefault();
    if (!this.state.msg) return null;
    this.socket.emit('send message', { text: this.state.msg, user: this.props.user,
                                       to: this.state.to, game: this.props.game });
    this.setState({ msg: '' });
  }
}
