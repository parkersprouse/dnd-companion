import React, { Component } from 'react';
import { Button, Dialog, Intent, EditableText, Toaster, Position } from '@blueprintjs/core';
import parseQuery from 'query-string';

const toaster = Toaster.create({
  position: Position.TOP_CENTER,
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggleDialog = this.toggleDialog.bind(this);

    console.log(window.location.search);
    console.log(parseQuery.parse(window.location.search));
  }

  render() {
    return (
      <div className="container">
        <Button onClick={this.toggleDialog} text="Show dialog" style={{ marginBottom: '1rem' }} />
        <Dialog iconName="inbox" isOpen={this.state.isOpen} onClose={this.toggleDialog} title="Dialog header">
          <div className="pt-dialog-body">
            Some content
          </div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button text="Secondary" />
              <Button intent={Intent.DANGER} onClick={this.toggleDialog} text="Close" />
            </div>
          </div>
        </Dialog>

        <h1>
          <EditableText
            intent={Intent.NONE}
            maxLength={15}
            placeholder="Edit..."
            selectAllOnFocus={true}
          />
        </h1>

        <button type="button" className="pt-button" onClick={() => toaster.show({ message: "Toasted!", timeout: 3000, intent: Intent.NONE })}>Toast</button>
      </div>
    );
  }

  toggleDialog() {
    this.setState({ isOpen: !this.state.isOpen });
  }
}
