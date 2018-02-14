import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import CustomDropdownToggler from '../../CustomDropdownToggler';
import InputToggler from '../../InputToggler';
import api from '../../../lib/api';

export default class ClassRacePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subrace_filter: props.character.race,
      subrace_options: null
    };
    this.alignment_options = [
      'Lawful Good',
      'Lawful Neutral',
      'Lawful Evil',
      'True Neutral',
      'Chaotic Good',
      'Chaotic Neutral',
      'Chaotic Evil'
    ];
  }

  render() {
    this.filterSubraces();
    return (
      <Grid stackable centered>

        <Grid.Row stretched>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <CustomDropdownToggler character={this.props.character}
                                   api='classes'
                                   name='class'
                                   label='Class' />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <CustomDropdownToggler character={this.props.character}
                                   api='races'
                                   name='race'
                                   label='Race'
                                   setParentState={this.setParentState} />
          </Grid.Column>
          <Grid.Column width={6} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <CustomDropdownToggler character={this.props.character}
                                   api='subraces'
                                   name='subrace'
                                   label='Subrace'
                                   options={this.state.subrace_options} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character}
                          name='background'
                          label='Background' />
          </Grid.Column>
          <Grid.Column width={5} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <CustomDropdownToggler character={this.props.character}
                                   name='alignment'
                                   label='Alignment'
                                   options={this.alignment_options} />
          </Grid.Column>
          <Grid.Column width={3} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character}
                          name='experience'
                          label='Experience'
                          number />
          </Grid.Column>
          <Grid.Column width={3} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
            <InputToggler character={this.props.character}
                          name='level'
                          label='Level'
                          number />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }

  setParentState = (state) => {
    this.setState(state);
  }

  filterSubraces = () => {
    if (!this.state.subrace_filter || this.loading) return;
    this.loading = true;

    api.filterSubraces({ race: { name: this.state.subrace_filter } }, (success, response) => {
      if (success) {
        this.setState({ subrace_options: response.content });
        this.loading = false;
      }
      else {
        this.setState({ subrace_options: [] });
        this.loading = false;
      }
    });
  }
}
