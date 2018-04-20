import React, { Component } from 'react';
import { Button, FormGroup, Intent } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import crypto from 'crypto';
import utils from '../../../lib/utils';
import api from '../../../lib/api';
import FormLabel from '../../FormLabel';

export default class CreateGameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      is_submitting: false,
      error: null
    };
  }

  componentWillMount() {
    utils.getCurrentUserInfo((success, response) => {
      if (success)
        this.setState({ userid: response.id });
    });
  }

  render() {
    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={9}>
            <div className='pt-card'>
              { this.renderErrors() }
              <form onSubmit={this.submit}>
                <FormGroup label={<FormLabel required>Game Name</FormLabel>} labelFor='name-input'>
                  <input id='name-input'
                         name='name'
                         className='pt-input'
                         style={{ width: '100%' }}
                         placeholder='Game Name'
                         type='text'
                         value={this.state.name}
                         onChange={this.onInputChange} />
                </FormGroup>
                <FormGroup label={<FormLabel>Description</FormLabel>} labelFor='description-input'>
                  <input id='description-input'
                         name='description'
                         className='pt-input'
                         style={{ width: '100%' }}
                         placeholder='Description'
                         type='text'
                         value={this.state.description}
                         onChange={this.onInputChange} />
                </FormGroup>
                <div className='pt-form-group' style={{ marginBottom: '0' }}>
                  <div className='pt-form-content' style={{ textAlign: 'center' }}>
                    <Button iconName='plus'
                            intent={Intent.PRIMARY}
                            type='submit'
                            loading={this.state.is_submitting}>Create
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
      name: this.state.name,
      description: this.state.description,
      code: crypto.randomBytes(12).toString('hex'),
      owner_id: this.state.userid,
      char_ids: [],
      user_ids: []
    };
    api.createGame(data, (success, response) => {
      if (success)
        window.location.href = '/games/' + response.content.id;
      else
        this.setState({ error: response.message, is_submitting: false });
    });
  }
}
