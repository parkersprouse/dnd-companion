import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import qs from 'query-string';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import AccountRecoveryResetPasswordForm from '../components/AccountRecoveryResetPasswordForm';
import AccountRecoverySendEmailForm from '../components/AccountRecoverySendEmailForm';
import api from '../lib/api';

export default class AccountRecovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reset_key: qs.parse(props.location.search).key || null,
      key_valid: null
    };
  }

  componentWillMount() {
    if (this.state.reset_key)
      api.verifyResetKey(this.state.reset_key, (success, response) => {
        if (success) this.setState({ key_valid: true });
        else window.location.href = '/account-recovery';
      });
  }

  render() {
    if (this.state.reset_key && this.state.key_valid === null) return null;
    else
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <h1 className='page-title'>Account Recovery</h1>
            <Grid stackable centered>
              <Grid.Row stretched>
                {
                  this.state.reset_key ?
                  <AccountRecoveryResetPasswordForm /> :
                  <AccountRecoverySendEmailForm />
                }
              </Grid.Row>
            </Grid>
          </InnerContainer>
        </OuterContainer>
      );
  }
}
