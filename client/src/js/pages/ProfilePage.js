import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import utils from '../lib/utils';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    utils.getCurrentUserInfo((success, response) => {
      if (success) {
        this.setState({ user: response });
      }
    });
  }

  render() {
    if (!this.state.user) return null;
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          Username: { this.state.user.username }<br/>
          E-mail: { this.state.user.email }<br/>
          Name: { this.state.user.name }
        </InnerContainer>
      </OuterContainer>
    );
  }
}
