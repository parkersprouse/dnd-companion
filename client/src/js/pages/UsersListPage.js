import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import api from '../lib/api';

export default class UsersListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }

  componentWillMount() {
    api.getUsers((success, response) => {
      if (success)
        this.setState({ users: response.content });
      else
        this.setState({ users: [] });
    });
  }

  render() {
    if (!this.state.users)
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <Grid stackable centered>
              <Grid.Row style={{ marginTop: '2rem' }}>
                <Grid.Column width={16}>
                  <Loader active content='Loading...' />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </InnerContainer>
        </OuterContainer>
      );

    else if (this.state.users.length === 0)
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <h2 className='page-title'>All Users</h2>
            <div className='text-center' style={{ marginTop: '3rem' }}>
              There are no registered users.
            </div>
          </InnerContainer>
        </OuterContainer>
      );

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h2 className='page-title'>All Users</h2>
          <div>
            { this.renderUsers() }
          </div>
        </InnerContainer>
      </OuterContainer>
    );
  }

  renderUsers = () => {
    const users = [];
    for (let i = 0; i < this.state.users.length; i++) {
      const user = this.state.users[i];
      users.push(
        <div key={i} style={{ marginBottom: '2rem' }}>
          <div><a href={'/users/' + user.id}>{ user.username }</a></div>
        </div>
      );
    }
    return users;
  }
}
