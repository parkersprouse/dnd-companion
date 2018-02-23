import React, { Component } from 'react';
import TextareaToggler from '../../TextareaToggler';

export default class PersonalityPanel extends Component {
  render() {
    return (
      <div>
        <TextareaToggler character={this.props.character} setRootState={this.props.setRootState}
                         name='personality' label='Personality Traits' />
        <hr />
        <TextareaToggler character={this.props.character} setRootState={this.props.setRootState}
                         name='ideals' label='Ideals' />
        <hr />
        <TextareaToggler character={this.props.character} setRootState={this.props.setRootState}
                         name='bonds' label='Bonds' />
        <hr />
        <TextareaToggler character={this.props.character} setRootState={this.props.setRootState}
                         name='flaws' label='Flaws' />
      </div>
    );
  }
}
