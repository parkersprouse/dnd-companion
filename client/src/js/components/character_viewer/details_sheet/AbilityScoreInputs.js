import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Button, Position, Toaster, Intent, Tooltip, InputGroup } from '@blueprintjs/core';
import { valueify } from '../../../lib/utils';
import api from '../../../lib/api';

class AbilityInputToggler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      saving: false,
      [props.name]: valueify(props.character.ability_scores[props.name].level, '')
    }
  }

  render() {
    if (this.state.editing)
      return (
        <div className='pt-form-group spellsheet-form-group'
             style={this.props.style ? this.props.style : null}>
          <div className='pt-form-content'>
            <div className='pt-input-group'>
              <InputGroup
                value={this.state[this.props.name]}
                placeholder=''
                type={this.props.number ? 'number' : 'text'}
                onChange={(event) => this.setState({ [this.props.name]: event.target.value }) }
                rightElement={<Tooltip content='Save' position={Position.TOP}>
                                <Button intent={Intent.SUCCESS} className='pt-minimal'
                                        onClick={this.save} iconName='tick'
                                        loading={this.state.saving}></Button>
                              </Tooltip>}
              />
            </div>
            <div className='pt-form-helper-text'>
              {this.props.label}
            </div>
          </div>
        </div>
      );

    return (
      <div className='pt-form-group spellsheet-form-group'
           style={this.props.style ? this.props.style : null}>
        <div className='pt-form-content'>
          <div className='pt-input-group'>
            <Tooltip content='Click to edit' position={Position.TOP}>
              <span className='char-sheet-editable-text' onClick={() => this.setEditing(true)}>
                { this.state[this.props.name] !== null &&
                  this.state[this.props.name] !== '' ?
                  this.state[this.props.name] : this.props.number ? '0' : 'None'
                } {
                  '(' +   this.props.character.ability_scores[this.props.name].modifier + ')'
                }
              </span>
            </Tooltip>
          </div>
          <div className='pt-form-helper-text'>
            {this.props.label}
          </div>
        </div>
      </div>
    );
  }

  determineModifier = (score) => {
    switch(score) {
      case '1':
        return '-5';
      case '2':
      case '3':
        return '-4';
      case '4':
      case '5':
        return '-3';
      case '6':
      case '7':
        return '-2';
      case '8':
      case '9':
        return '-1';
      case '10':
      case '11':
        return '0';
      case '12':
      case '13':
        return '+1';
      case '14':
      case '15':
        return '+2';
      case '16':
      case '17':
        return '+3';
      case '18':
      case '19':
        return '+4';
      case '20':
      case '21':
        return '+5';
      case '22':
      case '23':
        return '+6';
      case '24':
      case '25':
        return '+7';
      case '26':
      case '27':
        return '+8';
      case '28':
      case '29':
        return '+9';
      case '30':
        return '+10';
      default:
        return '0';
    }
  }

  save = () => {
    this.setState({ saving: true });
    this.props.character.ability_scores[this.props.name].level = this.state[this.props.name];
    this.props.character.ability_scores[this.props.name].modifier = this.determineModifier(this.state[this.props.name]);
    api.updateCharacter({ id: this.props.character.id, ability_scores: this.props.character.ability_scores }, (success, response) => {
      if (success) {
        this.showSuccessToast();
        this.setEditing(false);
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        this.showErrorToast();
      this.setState({ saving: false });
    });
  }

  setEditing = (editing) => {
    this.setState({ editing });
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

export default class AbilityScoreInputs extends Component {
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row stretched>
          <Grid.Column width={16}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='strength' label='Strength' number />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={16}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='dexterity' label='Dexterity' number />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={16}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='constitution' label='Constitution' number />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={16}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='intelligence' label='Intelligence' number />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={16}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='wisdom' label='Wisdom' number />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={16}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='charisma' label='Charisma' number />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
