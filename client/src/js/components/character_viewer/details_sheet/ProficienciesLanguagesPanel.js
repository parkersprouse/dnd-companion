import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ProficienciesList from './ProficienciesList';
import LanguagesList from './LanguagesList';

export default class ProficienciesLanguagesPanel extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={16} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <ProficienciesList character={this.props.character} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <LanguagesList character={this.props.character} />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
