import React, { Component } from 'react';
import { Button, Intent, FormGroup } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';

export default class LoginPage extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h1 className='page-title'>Account Recovery</h1>
          <Grid stackable centered>
            <Grid.Row stretched>
              <Grid.Column width={6}>
                <div className='pt-card'>
                  { this.renderSuccess() }
                  { this.renderError() }
                  <form onSubmit={this.submit}>
                    <FormGroup label={<FormLabel required>E-mail</FormLabel>} labelFor='email-input'>
                      <input id='email-input' name='email' className='pt-input'
                             style={{ width: '100%' }} placeholder='E-mail'
                             type='text' value={this.state.email} onChange={this.handleInputChange} />
                    </FormGroup>
                    <div className='pt-form-group' style={{ marginBottom: '0' }}>
                      <div className='pt-form-content' style={{ textAlign: 'center' }}>
                        <Button iconName='log-in'
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
}
