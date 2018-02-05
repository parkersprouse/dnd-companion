import React, { Component } from 'react';
import { Tab2, Tabs2, Button, Intent, Toaster, Alert, Position } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import api from '../lib/api';
import validator from 'validator';
import SpellSheet from '../components/character_viewer/SpellSheet';

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
      api.getCharacter({ id: parseInt(id, 10) }, (success, response) => {
        if (success)
          this.setState({ character: response.content[0] });
        else
          this.setState({ character: -1 });
      });
  }

  render() {
    if (!this.state.character) return null;

    else if (this.state.character === -1)
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <div>Character not found</div>
          </InnerContainer>
        </OuterContainer>
      );

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <Tabs2 id='CharacterTabs' large={true}>
            <Tab2 id='details' title='Details' panel={<div>Details</div>} />
            <Tab2 id='spells' title='Spells' panel={<SpellSheet character={this.state.character} />} />
            <Tab2 id='additional' title='Additional' panel={<div>Additional</div>} />
            <Tabs2.Expander />
            <Button iconName='cross' intent={Intent.DANGER}
                    onClick={() => this.setState({ show_delete_alert: true })}>Delete</Button>
          </Tabs2>
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
        <p>Are you sure you want to delete this character? This cannot be undone.</p>
      </Alert>
    );
  }

  handleDelete = () => {
    api.deleteCharacter(this.state.character.id, (success, response) => {
      if (success) {
        window.location.href = '/characters';
      }
      else {
        console.log(response)
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
