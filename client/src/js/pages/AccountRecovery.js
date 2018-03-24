import React, { Component } from 'react';
import { Button, Intent, FormGroup } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import FormLabel from '../components/FormLabel';
import api from '../lib/api';

export default class AccountRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: null,
      email: '',
      submitting: false
    };
  }

  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h1 className='page-title'>Account Recovery</h1>
          <Grid stackable centered>
            <Grid.Row stretched>
              <Grid.Column width={10}>
                <div className='pt-card'>
                  { this.renderSuccess() }
                  { this.renderError() }
                  <form onSubmit={this.submit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      If you forgot your username or password, fill out the
                      e-mail address associated with your account and we will
                      contact you with your username and a way to reset your
                      password.
                    </div>
                    <FormGroup label={<FormLabel required>E-mail</FormLabel>} labelFor='email-input'>
                      <input id='email-input' name='email' className='pt-input'
                             style={{ width: '100%' }} placeholder='E-mail'
                             type='text' value={this.state.email} onChange={({ target }) => this.setState({ email: target.value })} />
                    </FormGroup>
                    <div className='pt-form-group' style={{ marginBottom: '0' }}>
                      <div className='pt-form-content' style={{ textAlign: 'center' }}>
                        <Button iconName='envelope'
                                intent={Intent.PRIMARY}
                                type='submit'
                                loading={this.state.submitting}>Send
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </InnerContainer>
      </OuterContainer>
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
          <span className='pt-icon-tick-circle'></span> If there is an account
          associated with the entered e-mail address, you should receive an
          e-mail with instructions on recovering your account shortly.
        </div>
      );
    }
    return null;
  }

  submit = (e) => {
    e.preventDefault();
    this.setState({ submitting: true, success: false, error: null });
    api.sendRecoveryEmail(this.state.email, (success, response) => {
      if (success)
        this.setState({ success: true, submitting: false });
      else {
        console.log(response.content)
        this.setState({ error: response.message, submitting: false });
      }
    });
  }
}
