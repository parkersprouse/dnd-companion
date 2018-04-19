import React, { Component } from 'react';
import { Button, Dialog, Intent, NonIdealState, Position, Toaster, Tooltip } from '@blueprintjs/core';
import { Grid, Loader } from 'semantic-ui-react';
import api from '../lib/api';
import utils from '../lib/utils';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import CharacterShowTabs from '../components/characters/character_viewer/CharacterShowTabs';
import CharactersPanel from '../components/games/game_show/CharactersPanel';
import ChatPanel from '../components/games/game_show/ChatPanel';
import GameCodePanel from '../components/games/game_show/GameCodePanel';
import FormLabel from '../components/FormLabel';

export default class GameShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      user_is_dm: false,
      user: null,
      selected_char: null,
      sending: false,
      game_name: '',
      game_desc: '',
      show_edit_modal: false
    }
  }

  componentWillMount() {
    const { id } = this.props.computedMatch.params;

    utils.getCurrentUserInfo((success, response) => {
      const current_user = response;
      api.getGames({ id: Number(id) }, (success, response) => {
        if (success) {
          const game = response.content[0];
          if (game.owner_id === current_user.id || game.user_ids.indexOf(current_user.id) > -1)
            this.setState({ game, user_is_dm: game.owner_id === current_user.id,
                            user: current_user, game_name: game.name, game_desc: game.description });
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
                {
                  this.state.user_is_dm ?
                  <Tooltip content='Edit Game' position={Position.TOP}>
                    <div style={{ width: 'fit-content' }}>
                      <h2 onClick={this.toggleEditModal} style={{ cursor: 'pointer' }}>{ game.name }</h2>
                      <h6 onClick={this.toggleEditModal} style={{ marginBottom: '0', cursor: 'pointer' }}>{ game.description || 'No description' }</h6>
                    </div>
                  </Tooltip>
                  :
                  <div>
                    <h2>{ game.name }</h2>
                    <h6 style={{ marginBottom: '0' }}>{ game.description || 'No description' }</h6>
                  </div>
                }
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                <GameCodePanel code={game.code} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={11}>
                <ChatPanel {...this.state} />
                {/*<div className='pt-card'>
                </div>*/}
              </Grid.Column>
              <Grid.Column width={5}>
                <CharactersPanel {...this.state} setRootState={this.setRootState} />
              </Grid.Column>
            </Grid.Row>

            {
              this.state.user_is_dm ?
              <div style={{ textAlign: 'center' }}>
                <button className='pt-button pt-minimal pt-intent-danger' onClick={() => this.setState({ show_delete_modal: true })}>Delete Game</button>
              </div>
              : null
            }

            {
              this.state.selected_char ?
              <Grid.Row style={{ borderTop: '1px solid #ccc' }}>
                <Grid.Column width={16}>
                  <CharacterShowTabs character={this.state.selected_char} />
                </Grid.Column>
              </Grid.Row>
              : null
            }

          </Grid>

          { this.renderEditModal() }

        </InnerContainer>
      </OuterContainer>
    );
  }

  renderEditModal = () => {
    return (
      <Dialog isOpen={this.state.show_edit_modal} title={'Edit Game'}
              onClose={this.toggleEditModal}>
        <div className='pt-dialog-body'>
          <div className='pt-form-group'>
            <label className='pt-label' htmlFor='game_name'><FormLabel required>Game Name</FormLabel></label>
            <div className='pt-form-content'>
              <input id='game_name' name='game_name' className='pt-input pt-fill' placeholder='Game Name'
                     value={this.state.game_name} onChange={(e) => this.setState({ game_name: e.target.value })} />
            </div>
          </div>
          <div className='pt-form-group'>
            <label className='pt-label' htmlFor='game_desc'>Game Description</label>
            <div className='pt-form-content'>
              <input id='game_desc' name='game_desc' className='pt-input pt-fill' placeholder='Game Description'
                     value={this.state.game_desc} onChange={(e) => this.setState({ game_desc: e.target.value })} />
            </div>
          </div>
        </div>
        <div className='pt-dialog-footer'>
          <div className='pt-dialog-footer-actions'>
            <Button text='Close' onClick={this.toggleEditModal} />
            <Button text='Save' intent={Intent.PRIMARY} onClick={this.submitEdit}
                    disabled={!this.state.game_name}
                    loading={this.state.sending} />
          </div>
        </div>
      </Dialog>
    );
  }

  setRootState = (state) => {
    this.setState(state);
  }

  showSuccess = () => {
    Toaster.create().show({
      message: 'Game Successfully Updated',
      position: Position.TOP_CENTER,
      intent: Intent.SUCCESS,
      timeout: 2000
    });
  }

  showFail = () => {
    Toaster.create().show({
      message: 'Failed To Updated',
      position: Position.TOP_CENTER,
      intent: Intent.DANGER,
      timeout: 2000
    });
  }

  submitEdit = () => {
    if (!this.state.game_name) return;
    this.setState({ sending: true });
    api.updateGame({ id: this.state.game.id, name: this.state.game_name,
                     description: this.state.game_desc }, (success, response) => {
      if (success) {
        this.setState({ sending: false, show_edit_modal: false, game: response.content });
        this.showSuccess();
      }
      else {
        this.setState({ sending: false });
        this.showFail();
      }
    });
  }

  toggleEditModal = () => {
    this.setState({ show_edit_modal: !this.state.show_edit_modal })
  }
}
