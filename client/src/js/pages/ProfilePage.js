import React, { Component } from 'react';
import { Button, EditableText } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import utils from '../lib/utils';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: null,
      email: null,
      name: null
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.renderSubmitButton = this.renderSubmitButton.bind(this);
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
          Username: <EditableText value={this.state.username} onChange={(newVal) => this.onInputChange('username', newVal)} /><br />
          E-mail: <EditableText value={this.state.email} onChange={(newVal) => this.onInputChange('email', newVal)} /><br />
          Name: <EditableText value={this.state.name} onChange={(newVal) => this.onInputChange('name', newVal)} /><br /><br />
          { this.renderSubmitButton() }
        </InnerContainer>
      </OuterContainer>
    );
  }

  renderSubmitButton() {
    if (this.state.username !== this.state.user.username || this.state.email !== this.state.user.email || this.state.name !== this.state.user.name)
      return <Button onClick={this.submit}>Save Changes</Button>
    return null;
  }

  submit() {
    const axios = require('axios');
    // axios.get('/api/users')
    // .then(function (response) {
    //   console.log(response)
    // })
    // .catch(function (error) {
    //   console.log(error.response)
    // });

    axios.post('/api/users', { id: 1 })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error.response)
    });
  }
}
