import React, { Component } from 'react';
import { Button, Intent, FormGroup } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import FormLabel from './FormLabel';
import api from '../lib/api';

export default class AccountRecoverySendEmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: null,
      pass: '',
      confirm_pass: '',
      submitting: false
    }
  }

  render() {
    return (
      <Grid.Column width={10}>
        <div className='pt-card'>
          { this.renderSuccess() }
          { this.renderError() }
          <form onSubmit={this.submit}>
            <FormGroup label={<FormLabel required>New Password</FormLabel>} labelFor='pass-input'>
              <input id='pass-input' name='pass' className='pt-input'
                     style={{ width: '100%' }} placeholder='New Password'
                     type='password' value={this.state.pass} onChange={({ target }) => this.setState({ pass: target.value })} />
            </FormGroup>
            <FormGroup label={<FormLabel required>Confirm New Password</FormLabel>} labelFor='confirm_pass-input'>
              <input id='confirm_pass-input' name='confirm_pass' className='pt-input'
                     style={{ width: '100%' }} placeholder='Confirm New Password'
                     type='password' value={this.state.confirm_pass} onChange={({ target }) => this.setState({ confirm_pass: target.value })} />
            </FormGroup>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content' style={{ textAlign: 'center' }}>
                <Button iconName='tick'
                        intent={Intent.PRIMARY}
                        type='submit'
                        loading={this.state.submitting}>Confirm
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Grid.Column>
    );
  }

  renderError = () => {
    if (this.state.error) {
      return (
        <div className='pt-callout pt-intent-danger form-error-msg'>
          <span className='pt-icon-error'></span> { this.state.error }
        </div>
      );
    }
    return null;
  }

  renderSuccess = () => {
    if (this.state.success) {
      return (
        <div className='pt-callout pt-intent-success form-success-msg'>
          <span className='pt-icon-tick-circle'></span> Your new password has been
          successfully set. You may now <a href='/login'>log in</a> with it.
        </div>
      );
    }
    return null;
  }

  submit = (e) => {
    e.preventDefault();
    this.setState({ submitting: true, success: false, error: null });
    api.resetUserPassword({ pass: this.state.pass, confirm_pass: this.state.confirm_pass, reset_key: this.props.reset_key }, (success, response) => {
      if (success)
        this.setState({ success: true, submitting: false });
      else
        this.setState({ error: response.message, submitting: false });
    });
  }
}
