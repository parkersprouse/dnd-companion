import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

export default class LoginPage extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h1 className='page-title'>Login</h1>
          {
            !!this.props.location.state && !!this.props.location.state.next ?
            <Grid stackable centered>
              <Grid.Row stretched>
                <Grid.Column width={6}>
                  <div className='pt-callout pt-intent-danger form-error-msg'>
                    <span className='pt-icon-issue'></span> You must be logged in to view that page
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            : null
          }
          <LoginForm location={this.props.location} />
          <div className='login-form-extra-links'>
            <a href='/register'>Register</a> | <a href='/account-recovery'>Forgot Username/Password</a>
          </div>
        </InnerContainer>
      </OuterContainer>
    );
  }
}
