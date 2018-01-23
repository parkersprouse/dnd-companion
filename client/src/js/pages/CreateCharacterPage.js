import React, { Component } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import CreateCharacterForm from '../components/character/CreateCharacterForm';
import utils from '../lib/utils';
import _ from 'lodash';
import axios from 'axios';
import validator from 'validator';

export default class CreateCharacterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentWillMount() {
    utils.getCurrentUserInfo((success, response) => {
      if (success)
        this.setState({ userid: response.id });
    });
  }

  render() {
    console.log(this.state);

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <Button intent={Intent.PRIMARY}
                  iconName='add'
                  type='submit'
                  loading={this.state.isSubmitting}
                  className='pt-large'
                  style={{ float: 'right' }}
                  onClick={this.submit}>Create
          </Button>
          <h1 className='page-title'>Create Character</h1>
          { this.renderErrors() }
          <form onSubmit={this.submit}>
            <CreateCharacterForm onInputChange={this.onInputChange} setRootState={this.setRootState} rootState={this.state} />
          </form>
        </InnerContainer>
      </OuterContainer>
    );
  }

  renderErrors = () => {
    if (!this.state.error) return null;
    return (
      <div className='pt-callout pt-intent-danger form-error-msg'>
        <span className='pt-icon-error'></span> { this.state.error }
      </div>
    );
  }

  onInputChange = (event) => {
    let value = event.target.value;
    if (event.target.type === 'checkbox')
      value = event.target.checked;
    this.setState({ [event.target.name]: value });
  }

  setRootState = (changes) => {
    this.setState(changes);
  }

  submit = (event) => {
    event.preventDefault();
    this.setState({ error: null, isSubmitting: true });

    const data = { ...this.state };

    // Make sure empty strings don't make it through
    data.name = !!data.name ? data.name : null;

    data.equipment = this.formatItems(data, 'equipment');
    data.weapons = this.formatItems(data, 'weapons');
    data.armor = this.formatItems(data, 'armor');

    data.ability_scores = this.formatAbilityScores(data);

    console.log(data);

    axios.post('/api/characters/new', data)
    .then((response) => {
      window.location.href = '/characters/' + response.data.content.id;
    })
    .catch((error) => {
      this.setState({ error: error.response.data.message, isSubmitting: false });
    });
  }

  amountLabel = (item) => {
    return item.toLowerCase().replace(/ /g, '_');
  }

  formatItems = (data, items) => {
    if (data[items] && data[items].length > 0) {
      const newItems = [];
      _.each(data[items], (item) => {
        const amount_value = this.state[this.amountLabel(item)];
        const amount = validator.isNumeric(amount_value + '') && parseInt(amount_value, 10) > 0 ? amount_value : 1;
        newItems.push({ name: item, amount: amount });
      });
      return newItems;
    }
    return null;
  }

  formatAbilityScores = (data) => {
    const ability_scores = {};

    ability_scores.strength =     { level: data.strength,     modifier: data.strength_modifier }
    ability_scores.dexterity =    { level: data.dexterity,    modifier: data.dexterity_modifier }
    ability_scores.constitution = { level: data.constitution, modifier: data.constitution_modifier }
    ability_scores.intelligence = { level: data.intelligence, modifier: data.intelligence_modifier }
    ability_scores.wisdom =       { level: data.wisdom,       modifier: data.wisdom_modifier }
    ability_scores.charisma =     { level: data.charisma,     modifier: data.charisma_modifier }

    return ability_scores;
  }

}
