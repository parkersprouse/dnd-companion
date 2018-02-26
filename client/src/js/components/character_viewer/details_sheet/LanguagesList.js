import React, { Component } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import DetailsTreeDisplay from '../DetailsTreeDisplay';
import LanguageSelector from '../../character_creation/selectors/LanguageSelector';
import api from '../../../lib/api';

export default class LanguagesList extends Component {
  render() {
    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content searcher'>
          <DetailsTreeDisplay content={this.props.character.languages} remove={this.removeLanguage} />
          <LanguageSelector addLanguage={this.addLanguage} centered />
        </div>
      </div>
    );
  }

  addLanguage = (lang) => {
    const langs = this.props.character.languages || [];
    if (langs.indexOf(lang) > -1) return;
    langs.push(lang);
    api.updateCharacter({ id: this.props.character.id, languages: langs }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.forceUpdate();
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        this.showErrorToast();
    });
  }

  removeLanguage = (lang) => {
    const langs = this.props.character.languages;
    langs.splice(langs.indexOf(lang), 1);
    api.updateCharacter({ id: this.props.character.id, languages: langs }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.forceUpdate();
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        this.showErrorToast();
    });
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
