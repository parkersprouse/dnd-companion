import React, { Component } from 'react';
import { NonIdealState, Position, Tooltip } from '@blueprintjs/core';
import { Grid, Loader } from 'semantic-ui-react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import api from '../lib/api';
import utils from '../lib/utils';
import CharactersPanel from '../components/games/game_show/CharactersPanel';

export default class GameShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      user_is_dm: false,
      user_id: null
    }
  }

  componentWillMount() {
    const { id } = this.props.computedMatch.params;

    utils.getCurrentUserInfo((success, response) => {
      const current_user_id = response.id;
      api.getGames({ id: Number(id) }, (success, response) => {
        if (success) {
          const game = response.content[0];
          if (game.owner_id === current_user_id || game.user_ids.indexOf(current_user_id) > -1)
            this.setState({ game, user_is_dm: game.owner_id === current_user_id, user_id: current_user_id });
          else
            this.setState({ game: -1 });
        }
        else
          this.setState({ game: -1 });
      });
    });
  }

  render() {
    const { game } = this.state;

    if (!game)
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

    else if (game === -1)
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <NonIdealState visual='disable' title='Game Not Found'
                           description={<span>The game you're looking for doesn't exist.</span>} />
          </InnerContainer>
        </OuterContainer>
      );

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>

          <Grid stackable centered>

            <Grid.Row verticalAlign='bottom' style={{ borderBottom: '1px solid #ccc' }}>
              <Grid.Column width={11}>
                <h2>{ game.name }</h2>
                <h6 style={{ marginBottom: '0' }}>{ game.description || 'No description' }</h6>
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                Game Code: <Tooltip content='Players can use this code to join this game' position={Position.TOP}>
                              <strong>{ game.code }</strong>
                            </Tooltip>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={5}>
                <div className='pt-card'>
                </div>
              </Grid.Column>
              <Grid.Column width={6}>
                <div className='pt-card'>
                </div>
              </Grid.Column>
              <Grid.Column width={5}>
                <CharactersPanel ids={game.char_ids} user_id={this.state.user_id} />
              </Grid.Column>
            </Grid.Row>

          </Grid>

        </InnerContainer>
      </OuterContainer>
    );
  }
}
