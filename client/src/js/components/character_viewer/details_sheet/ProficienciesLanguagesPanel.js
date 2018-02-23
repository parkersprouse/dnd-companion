import React, { Component } from 'react';
import ProficienciesList from './ProficienciesList';
import LanguagesList from './LanguagesList';

export default class ProficienciesLanguagesPanel extends Component {
  render() {
    return (
      <div>
        <ProficienciesList character={this.props.character} setRootState={this.props.setRootState} />
        <hr />
        <LanguagesList character={this.props.character} setRootState={this.props.setRootState} />
      </div>
    );
  }
}
