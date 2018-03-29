import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Button, Position, Toaster, Intent, Tooltip, InputGroup } from '@blueprintjs/core';
import { valueify } from '../../../../lib/utils';
import api from '../../../../lib/api';

function showErrorToast() {
  Toaster.create().show({
    message: 'Failed to update',
    position: Position.TOP_CENTER,
    intent: Intent.DANGER,
    timeout: 2000
  });
}

function showSuccessToast() {
  Toaster.create().show({
    message: 'Successfully Updated',
    position: Position.TOP_CENTER,
    intent: Intent.SUCCESS,
    timeout: 2000
  });
}

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
              <span className='char-sheet-editable-text no-icon' onClick={() => this.setEditing(true)}>
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

    // Directly updating `this.props.character.ability_scores` prevents the spellcasting modifiers
    // from updating because `setRootState()` doesn't see the change since it's technically made
    // before the method is called
    const scores = JSON.parse(JSON.stringify(this.props.character.ability_scores));
    scores[this.props.name].level = this.state[this.props.name];
    scores[this.props.name].modifier = this.determineModifier(this.state[this.props.name]);
    api.updateCharacter({ id: this.props.character.id, ability_scores: scores }, (success, response) => {
      if (success) {
        showSuccessToast();
        this.setEditing(false);
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        showErrorToast();
      this.setState({ saving: false });
    });
  }

  setEditing = (editing) => {
    this.setState({ editing });
  }
}

export default class AbilityScoreInputs extends Component {
  render() {
    return (
      <Grid stackable centered>

        <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        <Grid.Row stretched>
          <Grid.Column width={6}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='strength' label='Strength' number />
          </Grid.Column>
          <Grid.Column width={10}>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('STR')} onChange={(e) => this.toggle(e, 'STR')} />
              <span className='pt-control-indicator'></span>
              Saving Throws
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Athletics')} onChange={(e) => this.toggle(e, 'Athletics')} />
              <span className='pt-control-indicator'></span>
              Athletics
            </label>
          </Grid.Column>
        </Grid.Row>

        <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        <Grid.Row stretched>
          <Grid.Column width={6}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='dexterity' label='Dexterity' number />
          </Grid.Column>
          <Grid.Column width={10}>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('DEX')} onChange={(e) => this.toggle(e, 'DEX')} />
              <span className='pt-control-indicator'></span>
              Saving Throws
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Acrobatics')} onChange={(e) => this.toggle(e, 'Acrobatics')} />
              <span className='pt-control-indicator'></span>
              Acrobatics
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Sleight of Hand')} onChange={(e) => this.toggle(e, 'Sleight of Hand')} />
              <span className='pt-control-indicator'></span>
              Sleight of Hand
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Stealth')} onChange={(e) => this.toggle(e, 'Stealth')} />
              <span className='pt-control-indicator'></span>
              Stealth
            </label>
          </Grid.Column>
        </Grid.Row>

        <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        <Grid.Row stretched>
          <Grid.Column width={6}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='constitution' label='Constitution' number />
          </Grid.Column>
          <Grid.Column width={10}>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('CON')} onChange={(e) => this.toggle(e, 'CON')} />
              <span className='pt-control-indicator'></span>
              Saving Throws
            </label>
          </Grid.Column>
        </Grid.Row>

        <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        <Grid.Row stretched>
          <Grid.Column width={6}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='intelligence' label='Intelligence' number />
          </Grid.Column>
          <Grid.Column width={10}>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('INT')} onChange={(e) => this.toggle(e, 'INT')} />
              <span className='pt-control-indicator'></span>
              Saving Throws
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Arcana')} onChange={(e) => this.toggle(e, 'Arcana')} />
              <span className='pt-control-indicator'></span>
              Arcana
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('History')} onChange={(e) => this.toggle(e, 'History')} />
              <span className='pt-control-indicator'></span>
              History
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Investigation')} onChange={(e) => this.toggle(e, 'Investigation')} />
              <span className='pt-control-indicator'></span>
              Investigation
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Nature')} onChange={(e) => this.toggle(e, 'Nature')} />
              <span className='pt-control-indicator'></span>
              Nature
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Religion')} onChange={(e) => this.toggle(e, 'Religion')} />
              <span className='pt-control-indicator'></span>
              Religion
            </label>
          </Grid.Column>
        </Grid.Row>

        <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        <Grid.Row stretched>
          <Grid.Column width={6}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='wisdom' label='Wisdom' number />
          </Grid.Column>
          <Grid.Column width={10}>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('WIS')} onChange={(e) => this.toggle(e, 'WIS')} />
              <span className='pt-control-indicator'></span>
              Saving Throws
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Animal Handling')} onChange={(e) => this.toggle(e, 'Animal Handling')} />
              <span className='pt-control-indicator'></span>
              Animal Handling
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Insight')} onChange={(e) => this.toggle(e, 'Insight')} />
              <span className='pt-control-indicator'></span>
              Insight
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Medicine')} onChange={(e) => this.toggle(e, 'Medicine')} />
              <span className='pt-control-indicator'></span>
              Medicine
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Perception')} onChange={(e) => this.toggle(e, 'Perception')} />
              <span className='pt-control-indicator'></span>
              Perception
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Survival')} onChange={(e) => this.toggle(e, 'Survival')} />
              <span className='pt-control-indicator'></span>
              Survival
            </label>
          </Grid.Column>
        </Grid.Row>

        <hr style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />

        <Grid.Row stretched>
          <Grid.Column width={6}>
            <AbilityInputToggler character={this.props.character}
                                 setRootState={this.props.setRootState}
                                 name='charisma' label='Charisma' number />
          </Grid.Column>
          <Grid.Column width={10}>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('CHA')} onChange={(e) => this.toggle(e, 'CHA')} />
              <span className='pt-control-indicator'></span>
              Saving Throws
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Deception')} onChange={(e) => this.toggle(e, 'Deception')} />
              <span className='pt-control-indicator'></span>
              Deception
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Intimidation')} onChange={(e) => this.toggle(e, 'Intimidation')} />
              <span className='pt-control-indicator'></span>
              Intimidation
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Performance')} onChange={(e) => this.toggle(e, 'Performance')} />
              <span className='pt-control-indicator'></span>
              Performance
            </label>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' checked={this.has('Persuasion')} onChange={(e) => this.toggle(e, 'Persuasion')} />
              <span className='pt-control-indicator'></span>
              Persuasion
            </label>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }

  has = (save) => {
    let prefix = 'Skill: ';
    if (['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].indexOf(save) > -1)
      prefix = 'Saving Throw: ';

    return this.props.character.proficiencies.indexOf(prefix + save) > -1;
  }

  toggle = (event, save) => {
    let prefix = 'Skill: ';
    if (['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].indexOf(save) > -1)
      prefix = 'Saving Throw: ';

    if (event.target.checked)
      this.props.character.proficiencies.push(prefix + save);
    else
      this.props.character.proficiencies.splice(this.props.character.proficiencies.indexOf(prefix + save), 1);

    this.save();
  }

  save = () => {
    api.updateCharacter({ id: this.props.character.id, proficiencies: this.props.character.proficiencies }, (success, response) => {
      if (success) {
        showSuccessToast();
        if (this.props.setRootState)
          this.props.setRootState({ character: response.content });
      }
      else
        showErrorToast();
      this.forceUpdate();
    });
  }
}
