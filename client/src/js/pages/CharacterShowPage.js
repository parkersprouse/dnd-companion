import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { Button, Intent, Toaster, Alert, Position, NonIdealState } from '@blueprintjs/core';
import validator from 'validator';
import api from '../lib/api';
import utils from '../lib/utils';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import CharacterShowTabs from '../components/characters/character_viewer/CharacterShowTabs';

export default class CharacterShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      show_delete_alert: false
    };
  }

  componentWillMount() {
    const { id } = this.props.computedMatch.params;

    if (!validator.isInt(id))
      this.setState({ character: -1 });
    else
      utils.getCurrentUserInfo((loggedIn, res) => {
        api.getCharacter({ id: Number(id), userid: Number(res.id) }, (success, response) => {
          if (success)
            this.setState({ character: response.content[0] });
          else
            this.setState({ character: -1 });
        });
      });
  }

  render() {
    if (!this.state.character)
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

    else if (this.state.character === -1)
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <NonIdealState visual='disable' title='Character Not Found'
                           description={<span>The character you're looking for doesn't exist.</span>} />
          </InnerContainer>
        </OuterContainer>
      );

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <CharacterShowTabs character={this.state.character} />
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button intent={Intent.DANGER} className='pt-minimal'
                    onClick={() => this.setState({ show_delete_alert: true })}>Delete</Button>
          </div>
          { this.renderConfirmDeleteAlert() }
        </InnerContainer>
      </OuterContainer>
    );
  }

  renderConfirmDeleteAlert = () => {
    return (
      <Alert
        intent={Intent.DANGER}
        isOpen={this.state.show_delete_alert}
        confirmButtonText='Delete'
        cancelButtonText='Cancel'
        onConfirm={this.handleDelete}
        onCancel={this.handleClose}
      >
        <p className='no-icon'>Are you sure you want to delete this character?</p>
        <p>This cannot be undone.</p>
      </Alert>
    );
  }

  handleDelete = () => {
    api.deleteCharacter(this.state.character.id, (success, response) => {
      if (success) {
        window.location.href = '/characters';
      }
      else {
        Toaster.create().show({
          message: 'Failed to delete',
          position: Position.TOP_CENTER,
          intent: Intent.DANGER,
          timeout: 2000
        });
      }
    });
  }

  handleClose = () => {
    this.setState({ show_delete_alert: !this.state.show_delete_alert })
  }
}
