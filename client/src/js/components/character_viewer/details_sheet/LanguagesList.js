import React, { Component } from 'react';
import DetailsTreeDisplay from '../DetailsTreeDisplay';
import LanguageSelector from '../../character_creation/selectors/LanguageSelector';

export default class LanguagesList extends Component {
  render() {
    console.log(this.props.character)
    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content searcher'>
          <DetailsTreeDisplay content={this.props.character.languages} remove={(i) => console.log(i)} />
          <LanguageSelector addLanguage={this.addLanguage} />
        </div>
      </div>
    );
  }

  addLanguage = (lang) => {
    console.log(lang);
  }
}
