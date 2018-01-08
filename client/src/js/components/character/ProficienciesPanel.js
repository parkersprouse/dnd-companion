import React, { Component } from 'react';
import LanguageSelector from './selectors/LanguageSelector';
import ProficiencySelector from './selectors/ProficiencySelector';

export default class ProficienciesPanel extends Component {
  addProficiency = (prof) => {
    if (!prof) return;
    const rootState = this.props.rootState;
    if (rootState && rootState.proficiencies) {
      rootState.proficiencies.push(prof);
      this.props.setRootState({ proficiencies: rootState.proficiencies });
    }
    else
      this.props.setRootState({ proficiencies: [prof] });
  }

  addLanguage = (lang) => {
    if (!lang) return;
    const rootState = this.props.rootState;
    if (rootState && rootState.languages) {
      rootState.languages.push(lang);
      this.props.setRootState({ languages: rootState.languages });
    }
    else
      this.props.setRootState({ languages: [lang] });
  }

  removeProficiency = (index) => {
    this.props.rootState.proficiencies.splice(index, 1);
    this.props.setRootState({ proficiencies: this.props.rootState.proficiencies });
  }

  removeLanguage = (index) => {
    this.props.rootState.languages.splice(index, 1);
    this.props.setRootState({ languages: this.props.rootState.languages });
  }

  render() {
    const profList = [];
    if (this.props.rootState && this.props.rootState.proficiencies) {
      this.props.rootState.proficiencies.forEach((prof, index) => {
        profList.push(
          <li key={index} className='pt-tree-node'>
            <div className='pt-tree-node-content'>
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>{prof}</span>
              <span className='pt-tree-node-secondary-label'>
                <a onClick={() => this.removeProficiency(index)} style={{ color: 'red' }}>
                  <span className='pt-icon-cross'></span>
                </a>
              </span>
            </div>
          </li>
        );
      });
    }

    const langList = [];
    if (this.props.rootState && this.props.rootState.languages) {
      this.props.rootState.languages.forEach((lang, index) => {
        langList.push(
          <li key={index} className='pt-tree-node'>
            <div className='pt-tree-node-content'>
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>{lang}</span>
              <span className='pt-tree-node-secondary-label'>
                <a onClick={() => this.removeLanguage(index)} style={{ color: 'red' }}>
                  <span className='pt-icon-cross'></span>
                </a>
              </span>
            </div>
          </li>
        );
      });
    }

    return (
      <div>
        <div className='pt-form-group' style={{ marginBottom: '0' }}>
          <div className='pt-form-content searcher'>
            <div className='pt-tree pt-elevation-0'>
              <ul className='pt-tree-node-list pt-tree-root'>
                {
                  profList.length > 0 ? profList :
                  <li className='pt-tree-node'>
                    <div className='pt-tree-node-content'>
                      <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}><i>None</i></span>
                    </div>
                  </li>
                }
              </ul>
            </div>
            <ProficiencySelector addProficiency={this.addProficiency} />
          </div>
        </div>
        <div className='pt-form-group' style={{ marginBottom: '0', marginTop: '2rem' }}>
          <div className='pt-form-content searcher'>
            <div className='pt-tree pt-elevation-0'>
              <ul className='pt-tree-node-list pt-tree-root'>
                {
                  langList.length > 0 ? langList :
                  <li className='pt-tree-node'>
                    <div className='pt-tree-node-content'>
                      <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}><i>None</i></span>
                    </div>
                  </li>
                }
              </ul>
            </div>
            <LanguageSelector addLanguage={this.addLanguage} />
          </div>
        </div>
      </div>
    );
  }
}
