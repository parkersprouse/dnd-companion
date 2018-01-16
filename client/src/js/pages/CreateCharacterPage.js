import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import CreateCharacterForm from '../components/character/CreateCharacterForm';
import utils from '../lib/utils';
import _ from 'lodash';
import axios from 'axios';

export default class CreateCharacterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillMount() {
    utils.getCurrentUserInfo((success, response) => {
      if (success)
        this.setState({ userid: response.id, player_name: response.name });
    });
  }

  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <button style={{ float: 'right' }} type='button' className='pt-button pt-large pt-intent-primary pt-icon-add' onClick={this.submit}>Create</button>
          <h1 className='page-title'>Create Character</h1>
          <form onSubmit={this.submit}>
            <CreateCharacterForm onInputChange={this.onInputChange} setRootState={this.setRootState} rootState={this.state} />
          </form>
        </InnerContainer>
      </OuterContainer>
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

    const data = { ...this.state };

    if (data.equipment && data.equipment.length > 0) {
      const newEquipment = [];
      _.each(data.equipment, (equip) => {
        const count = _.filter(data.equipment, (ele) => ele === equip).length;
        newEquipment.push({ name: equip, amount: count });
      });
      data.equipment = _.uniqBy(newEquipment, 'name');
    }

    if (data.weapons && data.weapons.length > 0) {
      const newWeapons = [];
      _.each(data.weapons, (weapon) => {
        const count = _.filter(data.weapons, (ele) => ele === weapon).length;
        newWeapons.push({ name: weapon, amount: count });
      });
      data.weapons = _.uniqBy(newWeapons, 'name');
    }

    if (data.armor && data.armor.length > 0) {
      const newArmor = [];
      _.each(data.armor, (armor) => {
        const count = _.filter(data.armor, (ele) => ele === armor).length;
        newArmor.push({ name: armor, amount: count });
      });
      data.armor = _.uniqBy(newArmor, 'name');
    }

    console.log(data);

    axios.post('/api/characters/new', data)
    .then(function (response) {
      console.log('success');
      console.log(response.data);
    })
    .catch(function (error) {
      console.log('error');
      console.log(error.response.data);
    });
  }
}
