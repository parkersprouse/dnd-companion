import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import api from '../../../lib/api';
import utils from '../../../lib/utils';
import _ from 'lodash';

export default class CharactersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chars: []
    }
  }

  componentWillMount() {
    // I'm playing a dangerous game with this, but that's the way it's gonna
    // be for now.
    // That's the story of this entire app.
    for (let i = 0; i < this.props.ids.length; i++) {
      api.getCharacter({ id: this.props.ids[i]}, (success, response) => {
        if (success)
          this.state.chars.push(response.content[0]);
        this.forceUpdate();
      });
    }
  }

  render() {
    if (this.state.chars.length !== this.props.ids.length)
      return null;

    return (
      <div className='pt-card'>
        <div style={{ width: '100%',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      borderBottom: '1px solid #ccc',
                      paddingBottom: '0.5rem',
                      marginTop: '-10px',
                      marginBottom: '1rem' }}>
          Characters
        </div>
        { this.renderChars() }
      </div>
    );
  }

  renderChars = () => {
    return _.map(this.state.chars, (char) => {
      return <div key={char.id}>{char.name}</div>
    });
  }
}
