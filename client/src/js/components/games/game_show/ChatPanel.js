import React, { Component } from 'react';
import { Grid, Item } from 'semantic-ui-react';
import api from '../../../lib/api';
import utils from '../../../lib/utils';
import _ from 'lodash';

export default class CharactersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    }
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className='pt-card'>
        <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #ccc' }}>
          (time) [Group] Message
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
    this.setState({ msg: '' })
  }
}
