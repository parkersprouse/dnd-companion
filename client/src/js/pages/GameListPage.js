import React, { Component } from 'react';
import { Tab2, Tabs2 } from '@blueprintjs/core';
import { Grid, Loader } from 'semantic-ui-react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import GamesYouRunList from '../components/games/game_list/GamesYouRunList';
import GamesYouPlayList from '../components/games/game_list/GamesYouPlayList';
import api from '../lib/api';
import utils from '../lib/utils';

export default class GameListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dm_games: null,
      player_games: null,
      user_id: null
    };
  }

  componentWillMount() {
    utils.getCurrentUserInfo((success, response) => {

      this.setState({ user_id: response.id });

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
    if (!this.state.dm_games || !this.state.player_games || !this.state.user_id)
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
          <Tabs2 id='games-tabs' vertical={true}>
            <Tab2 id='dm' title='Games You Run' panel={<GamesYouRunList games={this.state.dm_games} />} />
            <Tab2 id='player' title='Games You Play' panel={<GamesYouPlayList games={this.state.player_games} user={this.state.user_id} />} />
          </Tabs2>
        </InnerContainer>
      </OuterContainer>
    );
  }

}
