import React, { Component } from 'react';
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
          { JSON.stringify(this.state.character) }
        </InnerContainer>
      </OuterContainer>
    );
  }
}
