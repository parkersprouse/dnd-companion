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
    return (
      <div>
        <div className='pt-form-group' style={{ marginBottom: '0' }}>
          <div className='pt-form-content searcher'>
            <ProficiencySelector addProficiency={this.addProficiency} />
            <div className="pt-tree pt-elevation-0">
              <ul className="pt-tree-node-list pt-tree-root">
                <li className="pt-tree-node pt-tree-node-expanded">
                  <div className="pt-tree-node-content">
                    <span className="pt-tree-node-label" style={{ paddingLeft: '10px' }}>Proficiencies</span>
                    <span className="pt-tree-node-secondary-label">
                      <a onClick={null} style={{ color: 'red' }}>
                        <span className="pt-icon-cross"></span>
                      </a>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className='pt-form-helper-text'>Proficiencies</div>
          </div>
        </div>
        <div className='pt-form-group' style={{ marginBottom: '0', marginTop: '2rem' }}>
          <div className='pt-form-content searcher'>
            <LanguageSelector addLanguage={this.addLanguage} />
              <div className="pt-tree pt-elevation-0">
                <ul className="pt-tree-node-list pt-tree-root">
                  <li className="pt-tree-node pt-tree-node-expanded">
                    <div className="pt-tree-node-content">
                      <span className="pt-tree-node-label" style={{ paddingLeft: '10px' }}>Languages</span>
                      <span className="pt-tree-node-secondary-label">
                        <a onClick={null} style={{ color: 'red' }}>
                          <span className="pt-icon-cross"></span>
                        </a>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            <div className='pt-form-helper-text'>Languages</div>
          </div>
        </div>
      </div>
    );
  }
}
