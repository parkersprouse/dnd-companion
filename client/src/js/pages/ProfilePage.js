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
      error_msg: null,
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
                                loading={this.state.submitting}>Update
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
    if (this.state.error_msg)
      return (
        <div className='pt-callout pt-intent-danger form-error-msg'>
          <span className='pt-icon-error'></span> { this.state.error_msg }
        </div>
      );

    return null;
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
    this.setState({ submitting: true, error_msg: null });
    api.updateUser({ id: this.state.user.id, username: this.state.username, email: this.state.email, name: this.state.name }, (success, response) => {
      if (success) {
        cookie.remove('token');
        cookie.set('token', response.content.token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false, secure: false });
        this.setState({
          user: response.content.data,
          username: response.content.data.username,
          email: response.content.data.email,
          name: response.content.data.name
        });
        this.showSuccessToast();
      }
      else
        this.setState({ error_msg: response.message })
      this.setState({ submitting: false })
    });
  }
}
