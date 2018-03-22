import React, { Component } from 'react';
import { Button, FormGroup, Intent, Position, Toaster } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import Cookie from 'universal-cookie';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import FormLabel from '../components/FormLabel';
import utils from '../lib/utils';
import api from '../lib/api';

const cookie = new Cookie();

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: null,
      email: null,
      name: null,
      curpw: '',
      error_msg: null,
      pw_error_msg: null,
      cur_pw_error_msg: null,
      submitting: false
    }
  }

  componentDidMount() {
    utils.getCurrentUserInfo((success, response) => {
      if (success) {
        this.setState({
          user: response,
          username: response.username,
          email: response.email,
          name: response.name
        });
      }
    });
  }

  render() {
    if (!this.state.user) return null;
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h1 className='page-title'>Profile</h1>
          <Grid stackable centered>
            <Grid.Row>
              <Grid.Column width={6}>
                <div className='pt-card'>
                  { this.renderCurPWError() }
                  <FormGroup label={<FormLabel required>Current Password</FormLabel>} labelFor='curpw-input'
                             helperText='Current password is needed to make any profile changes'>
                    <input id='curpw-input'
                           name='curpw'
                           className='pt-input'
                           style={{ width: '100%' }}
                           placeholder='Current Password'
                           type='password'
                           value={this.state.curpw}
                           onChange={this.handleInputChange} />
                  </FormGroup>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched>
              <Grid.Column width={6}>
                <div className='pt-card'>
                  { this.renderError() }
                  <form onSubmit={this.submit}>

                    <FormGroup label={<FormLabel required>Username</FormLabel>} labelFor='username-input'>
                      <input id='username-input'
                             name='username'
                             className='pt-input'
                             style={{ width: '100%' }}
                             placeholder='Username'
                             type='text'
                             value={this.state.username}
                             onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup label={<FormLabel required>E-mail</FormLabel>} labelFor='email-input'>
                      <input id='email-input'
                             name='email'
                             className='pt-input'
                             style={{ width: '100%' }}
                             placeholder='E-mail'
                             type='text'
                             value={this.state.email}
                             onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup label={<FormLabel>Name</FormLabel>} labelFor='name-input'>
                      <input id='name-input'
                             name='name'
                             className='pt-input'
                             style={{ width: '100%' }}
                             placeholder='Name'
                             type='text'
                             value={this.state.name}
                             onChange={this.handleInputChange} />
                    </FormGroup>

                    <div className='pt-form-group' style={{ marginBottom: '0' }}>
                      <div className='pt-form-content' style={{ textAlign: 'center' }}>
                        <Button iconName='tick'
                                intent={Intent.PRIMARY}
                                type='submit'
                                loading={this.state.submitting}>Update Account
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </Grid.Column>
              <Grid.Column width={6}>
                <div className='pt-card'>
                  { this.renderPWError() }
                  <form onSubmit={this.submitPassword}>

                    <FormGroup label={<FormLabel required>New Password</FormLabel>} labelFor='pw-input'>
                      <input id='pw-input'
                             name='pw'
                             className='pt-input'
                             style={{ width: '100%' }}
                             placeholder='New Password'
                             type='password'
                             value={this.state.pw}
                             onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup label={<FormLabel required>Confirm New Password</FormLabel>} labelFor='cpw-input'>
                      <input id='cpw-input'
                             name='cpw'
                             className='pt-input'
                             style={{ width: '100%' }}
                             placeholder='Confirm New Password'
                             type='password'
                             value={this.state.cpw}
                             onChange={this.handleInputChange} />
                    </FormGroup>

                    <div className='pt-form-group' style={{ marginBottom: '0' }}>
                      <div className='pt-form-content' style={{ textAlign: 'center' }}>
                        <Button iconName='tick'
                                intent={Intent.PRIMARY}
                                type='submit'
                                loading={this.state.submitting}>Update Password
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

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  renderError = () => {
    if (!!this.state.error_msg)
      return (
        <div className='pt-callout pt-intent-danger form-error-msg'>
          <span className='pt-icon-error'></span> { this.state.error_msg }
        </div>
      );

    return null;
  }

  renderPWError = () => {
    if (!!this.state.pw_error_msg)
      return (
        <div className='pt-callout pt-intent-danger form-error-msg'>
          <span className='pt-icon-error'></span> { this.state.pw_error_msg }
        </div>
      );

    return null;
  }

  renderCurPWError = () => {
    if (!!this.state.cur_pw_error_msg)
      return (
        <div className='pt-callout pt-intent-danger form-error-msg'>
          <span className='pt-icon-error'></span> { this.state.cur_pw_error_msg }
        </div>
      );

    return null;
  }

  resetErrors = () => {
    this.setState({ error_msg: null, pw_error_msg: null, cur_pw_error_msg: null });
  }

  showSuccessToast = () => {
    Toaster.create().show({
      message: 'Successfully Updated',
      position: Position.TOP_CENTER,
      intent: Intent.SUCCESS,
      timeout: 2000
    });
  }

  submit = (e) => {
    e.preventDefault();
    this.resetErrors();
    this.setState({ submitting: true });
    api.updateUser({ id: this.state.user.id, username: this.state.username, email: this.state.email, name: this.state.name, curpwhash: this.state.user.pw_hash, curpw: this.state.curpw }, (success, response) => {
      if (success) {
        cookie.remove('token');
        cookie.set('token', response.content.token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false, secure: false });
        this.setState({
          user: response.content.data,
          username: response.content.data.username,
          email: response.content.data.email,
          name: response.content.data.name,
          curpw: ''
        });
        this.showSuccessToast();
      }
      else
        this.setState({ error_msg: response.message, cur_pw_error_msg: response.cur_pw_msg });
      this.setState({ submitting: false });
    });
  }

  submitPassword = (e) => {
    e.preventDefault();
    this.resetErrors();
    this.setState({ submitting: true });
    api.updateUserPassword({ id: this.state.user.id, password: this.state.pw, confirm_password: this.state.cpw, curpwhash: this.state.user.pw_hash, curpw: this.state.curpw }, (success, response) => {
      if (success) {
        cookie.remove('token');
        cookie.set('token', response.content.token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false, secure: false });
        this.showSuccessToast();
        this.setState({ user: response.content.data, curpw: '' });
      }
      else
        this.setState({ pw_error_msg: response.message, cur_pw_error_msg: response.cur_pw_msg });
      this.setState({ submitting: false });
    });
  }
}
