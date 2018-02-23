import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import TextareaToggler from '../TextareaToggler';

export default class NotesSheet extends Component {
  render() {
    return (
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column width={15}>
            <div className='pt-card'>
              <TextareaToggler character={this.props.character} setRootState={this.props.setRootState} name='notes' rows={20} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
