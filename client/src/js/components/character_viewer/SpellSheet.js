import React, { Component } from 'react';
import { EditableText } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import constants from '../../lib/constants';
import axios from 'axios';
import _ from 'lodash';

export default class SpellSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_spells: [],
      char_spells: []
    }
  }

  componentWillMount() {
    axios.get('/api/db/spells')
      .then((response) => {
        if (response.status === constants.http_ok) {
          const char_spells = [];
          _.forEach(response.data.content, (elem) => {
            _.forEach(this.props.character.spells, (id) => {
              if (elem.id == id) char_spells.push(elem);
            });
          });

          this.setState({ all_spells: response.data.content, char_spells });
        }
      })
      .catch((error) => {});
  }

  render() {
    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={6} verticalAlign='middle'>
            <strong>Spellcasting Class:</strong> <EditableText placeholder='Enter class' />
          </Grid.Column>
          <Grid.Column width={10} verticalAlign='middle'>
            <div className='pt-card'>
              Other stuff
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
