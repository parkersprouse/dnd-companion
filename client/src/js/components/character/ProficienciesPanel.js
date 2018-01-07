import React, { Component } from 'react';
import LanguageSelector from './selectors/LanguageSelector';
import ProficiencySelector from './selectors/ProficiencySelector';

export default class ProficienciesPanel extends Component {
  addProficiency = (prof) => {
    const rootState = this.props.rootState;

    let newProf = '';
    if (rootState && rootState.proficiencies)
      if (rootState.proficiencies.endsWith('\n'))
        newProf = rootState.proficiencies + prof.name + '\n';
      else
        newProf = rootState.proficiencies + '\n' + prof.name + '\n';
    else
      newProf = prof.name + '\n';
    this.props.setRootState({ proficiencies: newProf });
  }

  addLanguage = (lang) => {
    const rootState = this.props.rootState;

    let newLang = '';
    if (rootState && rootState.languages)
      if (rootState.languages.endsWith('\n'))
        newLang = rootState.languages + lang.name + '\n';
      else
        newLang = rootState.languages + '\n' + lang.name + '\n';
    else
      newLang = lang.name + '\n';
    this.props.setRootState({ languages: newLang });
  }

  render() {
    let profRows = 1;
    if (this.props.rootState && this.props.rootState.proficiencies)
      profRows = this.props.rootState.proficiencies.split('\n').length;

    let langRows = 1;
    if (this.props.rootState && this.props.rootState.languages)
      langRows = this.props.rootState.languages.split('\n').length;

    return (
      <div>
        <div className='pt-form-group' style={{ marginBottom: '0' }}>
          <div className='pt-form-content searcher'>
            <ProficiencySelector addProficiency={this.addProficiency} />
            <textarea name='proficiencies' className='pt-input pt-fill'
                      value={!!this.props.rootState ? this.props.rootState.proficiencies : ''}
                      rows={profRows} onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Proficiencies</div>
          </div>
        </div>
        <div className='pt-form-group' style={{ marginBottom: '0', marginTop: '1rem' }}>
          <div className='pt-form-content searcher'>
            <LanguageSelector addLanguage={this.addLanguage} />
            <textarea name='languages' className='pt-input pt-fill'
                      value={!!this.props.rootState ? this.props.rootState.languages : ''}
                      rows={langRows} onChange={this.props.update}></textarea>
            <div className='pt-form-helper-text'>Languages</div>
          </div>
        </div>
      </div>
    );
  }
}
