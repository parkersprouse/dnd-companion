import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { NumericInput } from "@blueprintjs/core";
import api from '../../lib/api';

export default class AbilityScoresPanel extends Component {
  componentWillMount() {
    api.getAbilityScores((success, response) => {
      if (success)
        this.setState({ scores: response.content });
    });
  }

  render() {
    if (!this.state) return null;

    const ability_scores = this.state.scores.map((score, index) => {
      return (
        <Grid.Row key={index}>
          <Grid.Column width={13} style={{ paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <NumericInput value={this.props.root_state[score.full_name.toLowerCase()]} onValueChange={(num, str) => this.handleValueChange(str, score.full_name.toLowerCase())} className='pt-fill' />
                <div className='pt-form-helper-text'>{score.full_name}</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={3} style={{ paddingLeft: '0.5rem' }} textAlign='center' verticalAlign='middle'>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                {/*<NumericInput value={this.props.root_state[score.full_name.toLowerCase() + '_modifier']} onValueChange={(num, str) => this.handleValueChange(str, score.full_name.toLowerCase() + '_modifier')} className='pt-fill' />*/}
                <span className='no-icon'>{ this.props.root_state[score.full_name.toLowerCase() + '_modifier'] || '0' }</span>
                <div className='pt-form-helper-text'>Modifier</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      );
    });

    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={16}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <NumericInput value={this.props.root_state['proficiency_bonus']} onValueChange={(num, str) => this.handleValueChange(str, 'proficiency_bonus')} className='pt-fill' />
                <div className='pt-form-helper-text'>Proficiency Bonus</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        { ability_scores }
        <Grid.Row>
          <Grid.Column width={16}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <NumericInput value={this.props.root_state['passive_wisdom']} onValueChange={(num, str) => this.handleValueChange(str, 'passive_wisdom')} className='pt-fill' />
                <div className='pt-form-helper-text'>Passive Wisdom (Perception)</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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

  handleValueChange = (value, name) => {
    const modifier = name + '_modifier';
    this.props.setRootState({
      [name]: value,
      [modifier]: this.determineModifier(value)
    });
  }
}
