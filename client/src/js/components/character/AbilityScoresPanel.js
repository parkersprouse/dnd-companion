import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { NumericInput } from "@blueprintjs/core";
import axios from 'axios';

export default class AbilityScoresPanel extends Component {
  componentWillMount() {
    axios.get('/api/db/ability_scores')
    .then((response) => {
      this.setState({ scores: response.data.content });
    })
    .catch((error) => {});
  }

  handleValueChange = (num, name) => {
    this.props.setRootState({ [name]: num });
  }

  render() {
    if (!this.state) return null;

    const ability_scores = this.state.scores.map((score, index) => {
      return (
        <Grid.Row>
          <Grid.Column width={8} style={{ paddingRight: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <NumericInput value={this.props.rootState[score.full_name.toLowerCase()]} onValueChange={(num) => this.handleValueChange(num, score.full_name.toLowerCase())} className='pt-fill' />
                <div className='pt-form-helper-text'>{score.full_name}</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={8} style={{ paddingLeft: '0.5rem' }}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <NumericInput value={this.props.rootState[score.full_name.toLowerCase() + '_modifier']} onValueChange={(num) => this.handleValueChange(num, score.full_name.toLowerCase() + '_modifier')} className='pt-fill' />
                <div className='pt-form-helper-text'>{score.full_name.slice(0, 3)}. Modifier</div>
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
                <NumericInput value={this.props.rootState['proficiency_bonus']} onValueChange={(num) => this.handleValueChange(num, 'proficiency_bonus')} className='pt-fill' />
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
                <NumericInput value={this.props.rootState['passive_wisdom']} onValueChange={(num) => this.handleValueChange(num, 'passive_wisdom')} className='pt-fill' />
                <div className='pt-form-helper-text'>Passive Wisdom (Perception)</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
