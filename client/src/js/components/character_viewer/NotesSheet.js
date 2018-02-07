import React, { Component } from 'react';
import { Position, Toaster, Intent, Button, Tooltip } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import { valueify } from '../../lib/utils';
import api from '../../lib/api';

export default class NotesSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: valueify(props.character.notes, ''),
      editing: false
    };
  }

  render() {
    let notes_display = null;
    if (this.state.editing) {
      notes_display =
        <div>
          <div className='pt-form-group' style={{ marginBottom: '0' }}>
            <div className='pt-form-content'>
              <textarea name='notes' className='pt-input pt-fill' rows={20} onChange={this.onInputChange} value={this.state.notes}></textarea>
            </div>
          </div>
          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <Button intent={Intent.PRIMARY} onClick={this.save} loading={this.state.saving}>Save</Button>
          </div>
        </div>;
    }
    else {
      notes_display =
        <Tooltip content='Click to edit' position={Position.TOP}>
          <div style={{ whiteSpace: 'pre-wrap', cursor: 'pointer' }} onClick={() => this.setEditing(true)}>
            { this.state.notes !== null && this.state.notes !== '' ? this.state.notes : 'No notes. Click to edit.' }
          </div>
        </Tooltip>;
    }

    return (
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column width={16}>
            <div className='pt-card'>
              { notes_display }
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  save = () => {
    this.setState({ saving: true });
    api.updateCharacter({ id: this.props.character.id, notes: this.state.notes }, (success) => {
      if (success) {
        this.showSuccessToast();
        this.setEditing(false);
      }
      else
        this.showErrorToast();
      this.setState({ saving: false });
    });
  }

  setEditing = (editing) => {
    this.setState({ editing });
  }

  showErrorToast = () => {
    Toaster.create().show({
      message: 'Failed to update',
      position: Position.TOP_CENTER,
      intent: Intent.DANGER,
      timeout: 2000
    });
  }

  showSuccessToast = () => {
    Toaster.create().show({
      message: 'Successfully Updated',
      position: Position.TOP_CENTER,
      intent: Intent.SUCCESS,
      timeout: 2000
    });
  }
}
