import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ProficienciesList from './ProficienciesList';
import LanguagesList from './LanguagesList';

export default class ProficienciesLanguagesPanel extends Component {
  render() {
    return (
      <div>
        <ProficienciesList character={this.props.character} />
        <hr />
        <LanguagesList character={this.props.character} />
      </div>
    );
  }
}
