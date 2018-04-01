import React, { Component } from 'react';
import { NonIdealState } from '@blueprintjs/core';
import { Grid, Loader } from 'semantic-ui-react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import api from '../lib/api';

export default class UserShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    const { id } = this.props.computedMatch.params;

    api.getUserBy({ id: Number(id) }, (success, response) => {
      console.log(response)
      if (success)
        this.setState({ user: response.content });
      else
        this.setState({ user: -1 });
    });
  }

  render() {
    const { user } = this.state;

    if (!user)
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

    else if (user === -1)
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <NonIdealState visual='disable' title='User Not Found'
                           description={<span>The user you're looking for doesn't exist.</span>} />
          </InnerContainer>
        </OuterContainer>
      );

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h2 className='page-title'>{ user.username }</h2>
          <div><strong>Username</strong>: { user.username }</div>
          <div><strong>Name</strong>: { user.name }</div>
        </InnerContainer>
      </OuterContainer>
    );
  }
}
