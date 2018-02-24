import React, { Component } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import _ from 'lodash';
import DetailsTreeDisplay from '../DetailsTreeDisplay';
import ProficiencySelector from '../../character_creation/selectors/ProficiencySelector';
import api from '../../../lib/api';

export default class ProficienciesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proficiencies: null
    };
  }

  componentWillMount() {
    api.getProficiencies((success, response) => {
      if (success) {
        const proficiencies = _.reject(response.content, (p) => {
          return p.name.toLowerCase().indexOf('skill') > -1 ||
                 p.name.toLowerCase().indexOf('saving throw') > -1;
        });
        this.setState({ proficiencies: _.sortBy(proficiencies, ['name']) });
      }
    });
  }

  render() {
    if (!this.state.proficiencies) return null;

    const filtered_profs = _.reject(this.props.character.proficiencies, (p) => {
      return p.toLowerCase().indexOf('skill') > -1 ||
             p.toLowerCase().indexOf('saving throw') > -1;
    });

    return (
      <div className='pt-form-group' style={{ marginBottom: '0' }}>
        <div className='pt-form-content searcher'>
          <DetailsTreeDisplay content={filtered_profs}
                              remove={this.removeProficiency} />
          <ProficiencySelector addProficiency={this.addProficiency}
                               options={this.state.proficiencies} />
        </div>
      </div>
    );
  }

  addProficiency = (prof) => {
    const profs = this.props.character.proficiencies || [];
    if (profs.indexOf(prof) > -1) return;
    profs.push(prof);
    api.updateCharacter({ id: this.props.character.id, proficiencies: profs }, (success, response) => {
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

  removeProficiency = (prof) => {
    const profs = this.props.character.proficiencies;
    profs.splice(profs.indexOf(prof), 1);
    api.updateCharacter({ id: this.props.character.id, proficiencies: profs }, (success, response) => {
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
