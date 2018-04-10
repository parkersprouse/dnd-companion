import React, { Component } from 'react';
import { Button, FormGroup, Intent } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import _ from 'lodash';
import api from '../../../lib/api';
import utils from '../../../lib/utils';
import FormLabel from '../../FormLabel';

export default class JoinGameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: utils.valueify(props.code, ''),
      char_id: null,
      user_id: null,
      is_submitting: false,
      error: null
    };
  }

  componentWillMount() {
    utils.getCurrentUserInfo((success, response) => {
      this.setState({ user_id: response.id });
      api.getUsersCharacters(response.id, (success, response) => {
        this.setState({ characters: response.content });
      });
    });
  }

  render() {
    const options = _.map(this.state.characters, (char) => <option value={char.id} key={char.id}>{char.name}</option>);

    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={9}>
            <div className='pt-card'>
              { this.renderErrors() }
              <form onSubmit={this.submit}>
                <FormGroup label={<FormLabel required>Game Code</FormLabel>} labelFor='code-input'>
                  <input id='code-input'
                         name='code'
                         className='pt-input pt-fill'
                         placeholder='Game Code'
                         type='text'
                         value={this.state.code}
                         onChange={this.onInputChange} />
                </FormGroup>
                <FormGroup label={<FormLabel required>Select Character</FormLabel>} labelFor='char-input'>
                  <div className='pt-select pt-fill'>
                    <select id='char-input'
                            name='char_id'
                            className='pt-fill'
                            onChange={this.onInputChange}>
                      <option value=''>Select Character</option>
                      { options }
                    </select>
                  </div>
                </FormGroup>
                <div className='pt-form-group' style={{ marginBottom: '0' }}>
                  <div className='pt-form-content' style={{ textAlign: 'center' }}>
                    <Button iconName='new-person'
                            intent={Intent.PRIMARY}
                            type='submit'
                            loading={this.state.is_submitting}>Join
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  renderErrors = () => {
    if (!this.state.error) return null;
    return (
      <div className='pt-callout pt-intent-danger form-error-msg'>
        <span className='pt-icon-error'></span> { this.state.error }
      </div>
    );
  }

  submit = (event) => {
    event.preventDefault();
    this.setState({ error: null, is_submitting: true });
    const data = {
      code: this.state.code,
      char_id: this.state.char_id,
      user_id: this.state.user_id
    };
    api.joinGame(data, (success, response) => {
      if (success)
        window.location.href = '/games/' + response.content.id;
      else
        this.setState({ error: response.message, is_submitting: false });
    });
  }

}
