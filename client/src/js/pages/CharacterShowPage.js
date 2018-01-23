import React, { Component } from 'react';
import { Tab2, Tabs2 } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import api from '../lib/api';
import validator from 'validator';

export default class CharacterShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null
    };
  }

  componentWillMount() {
    const { id } = this.props.computedMatch.params;

    if (!validator.isInt(id))
      this.setState({ character: -1 });
    else
      api.getCharacter({ id: parseInt(id, 10) }, (success, response) => {
        if (success)
          this.setState({ character: response.content });
        else
          this.setState({ character: -1 });
      });
  }

  render() {
    if (!this.state.character) return null;

    else if (this.state.character === -1)
      return (
        <OuterContainer>
          <Header />
          <InnerContainer>
            <div>Character not found</div>
          </InnerContainer>
        </OuterContainer>
      );

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <Tabs2 id='CharacterTabs'>
            <Tab2 id='details' title='Details' panel={<div>Details</div>} />
            <Tab2 id='spells' title='Spells' panel={<div>Spells</div>} />
            <Tab2 id='additional' title='Additional' panel={<div>Additional</div>} />
          </Tabs2>
          { /*JSON.stringify(this.state.character)*/ }
        </InnerContainer>
      </OuterContainer>
    );
  }
}
