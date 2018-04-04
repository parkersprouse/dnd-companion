import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import api from '../lib/api';
import utils from '../lib/utils';

export default class GameListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dm_games: null,
      player_games: null
    };
  }

  componentWillMount() {
    utils.getCurrentUserInfo((success, response) => {

      api.getGames({ owner_id: response.id }, (success, response) => {
        if (success)
          this.setState({ dm_games: response.content });
        else
          this.setState({ dm_games: [] });
      });

      api.getUsersGames(response.id, (success, response) => {
        if (success)
          this.setState({ player_games: response.content });
        else
          this.setState({ player_games: [] });
      });

    });
  }

  render() {
    if (!this.state.dm_games || !this.state.player_games)
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

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <h1 className='page-title'>Your Games</h1>
          Games you run: { this.state.dm_games.length }
          <hr />
          Games you have a character in: { this.state.player_games.length }
        </InnerContainer>
      </OuterContainer>
    );
  }

}
