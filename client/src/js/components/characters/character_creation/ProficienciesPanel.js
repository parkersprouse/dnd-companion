import React, { Component } from 'react';
import _ from 'lodash';
import LanguageSelector from '../selectors/LanguageSelector';
import ProficiencySelector from '../selectors/ProficiencySelector';

export default class ProficienciesPanel extends Component {
  addProficiency = (prof) => {
    if (!prof) return;
    const root_state = this.props.root_state;
    if (root_state && root_state.proficiencies) {
      root_state.proficiencies.push(prof);
      this.props.setRootState({ proficiencies: root_state.proficiencies });
    }
    else
      this.props.setRootState({ proficiencies: [prof] });
  }

  addLanguage = (lang) => {
    if (!lang) return;
    const root_state = this.props.root_state;
    if (root_state && root_state.languages) {
      root_state.languages.push(lang);
      this.props.setRootState({ languages: root_state.languages });
    }
    else
      this.props.setRootState({ languages: [lang] });
  }

  removeProficiency = (prof) => {
    const { proficiencies } = this.props.root_state;
    proficiencies.splice(proficiencies.indexOf(prof), 1);
    this.props.setRootState({ proficiencies });
  }

  removeLanguage = (lang) => {
    const { languages } = this.props.root_state;
    languages.splice(languages.indexOf(lang), 1);
    this.props.setRootState({ languages });
  }

  render() {
    const profList = [];
    if (this.props.root_state && this.props.root_state.proficiencies) {
      const proficiencies = _.sortBy(this.props.root_state.proficiencies, (p) => p);
      proficiencies.forEach((prof, index) => {
        profList.push(
          <li key={index} className='pt-tree-node'>
            <div className='pt-tree-node-content'>
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>{prof}</span>
              <span className='pt-tree-node-secondary-label'>
                <a onClick={() => this.removeProficiency(prof)} className='remove-item-btn'>
                  <span className='pt-icon-cross'></span>
                </a>
              </span>
            </div>
          </li>
        );
      });
    }

    const langList = [];
    if (this.props.root_state && this.props.root_state.languages) {
      const languages = _.sortBy(this.props.root_state.languages, (l) => l);
      languages.forEach((lang, index) => {
        langList.push(
          <li key={index} className='pt-tree-node'>
            <div className='pt-tree-node-content'>
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>{lang}</span>
              <span className='pt-tree-node-secondary-label'>
                <a onClick={() => this.removeLanguage(lang)} className='remove-item-btn'>
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
        <div className='pt-form-group' style={{ marginBottom: '2rem' }}>
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
        <div className='pt-form-group' style={{ marginBottom: '0' }}>
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
