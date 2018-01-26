import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';

export default class CharacterShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const available_spells = _.filter(nextProps.all_spells, { level: nextProps.level });
    this.setState({ available_spells });
  }

  render() {
    if (this.props.level === 0) {
      return (
        <Grid>
          <Grid.Row centered textAlign='center'>
            <Grid.Column width={2} verticalAlign='middle'>
              <span className='char-sheet-spell-header'>
                {this.props.level}
              </span>
            </Grid.Column>
            <Grid.Column width={14} verticalAlign='middle'>
              <span className='char-sheet-spell-header'>
                Cantrips
              </span>
            </Grid.Column>
          </Grid.Row>
         </Grid>
      );
    }

    return (
      <Grid>
        <Grid.Row centered textAlign='center'>
          <Grid.Column width={2} verticalAlign='middle'>
            <span className='char-sheet-spell-header'>
              {this.props.level}
            </span>
          </Grid.Column>
          <Grid.Column width={5} verticalAlign='middle'>
            <div className='pt-form-group spellsheet-form-group'>
              <div className='pt-form-content'>
                <div className='pt-input-group'>
                  0
                </div>
                <div className='pt-form-helper-text'>
                  Total Slots
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={9} verticalAlign='middle'>
            <div className='pt-form-group spellsheet-form-group'>
              <div className='pt-form-content'>
                <div className='pt-input-group'>
                  { '-'.repeat(this.props.level) }
                </div>
                <div className='pt-form-helper-text'>
                  Expended Slots
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
       </Grid>
    );
  }
}
