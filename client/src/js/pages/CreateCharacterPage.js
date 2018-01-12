import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import CreateCharacterForm from '../components/character/CreateCharacterForm';

export default class CreateCharacterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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
    console.log(this.state);

    const data = {};
  }
}
