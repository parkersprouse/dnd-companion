import React, { Component } from 'react';
import { Button, EditableText } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import utils from '../lib/utils';
import api from '../lib/api';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: null,
      email: null,
      name: null,
      success: false,
      errorMsg: null
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.renderSubmitButton = this.renderSubmitButton.bind(this);
    this.renderSuccess = this.renderSuccess.bind(this);
    this.renderError = this.renderError.bind(this);
    this.submit = this.submit.bind(this);
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

  onInputChange(input, value) {
    this.setState({ [input]: value });
  }

  render() {
    if (!this.state.user) return null;
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          { this.renderError() }
          { this.renderSuccess() }
          Username: <EditableText value={this.state.username} onChange={(newVal) => this.onInputChange('username', newVal)} /><br /><br />
          E-mail: <EditableText value={this.state.email} onChange={(newVal) => this.onInputChange('email', newVal)} /><br /><br />
          Name: <EditableText value={this.state.name} onChange={(newVal) => this.onInputChange('name', newVal)} /><br /><br />
          { this.renderSubmitButton() }
        </InnerContainer>
      </OuterContainer>
    );
  }

  renderSubmitButton() {
    if (this.state.username !== this.state.user.username ||
        this.state.email !== this.state.user.email ||
        this.state.name !== this.state.user.name)
      return <Button onClick={this.submit}>Save Changes</Button>
    return null;
  }

  renderError() {
    if (this.state.errorMsg) {
      return (
        <div className='pt-callout pt-intent-danger form-error-msg'>
          <span className='pt-icon-error'></span> { this.state.errorMsg }
        </div>
      );
    }
    return null;
  }

  renderSuccess() {
    if (this.state.success) {
      return (
        <div className='pt-callout pt-intent-success form-success-msg'>
          <span className='pt-icon-tick-circle'></span>&nbsp;
          Your account has been successfully updated
        </div>
      );
    }
    return null;
  }

  submit() {
    this.setState({ success: false, errorMsg: null });
    api.updateUser({
      id: this.state.user.id,
      username: this.state.username,
      email: this.state.email,
      name: this.state.name
    }, (success, response) => {
      if (success)
        this.setState({
          success: true,
          user: response.content,
          username: response.content.username,
          email: response.content.email,
          name: response.content.name
        })
      else this.setState({ errorMsg: response.message })
    });
  }
}
