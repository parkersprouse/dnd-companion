import React, { Component } from 'react';
import TextareaToggler from '../../TextareaToggler';

export default class DetailsSheet extends Component {
  render() {
    return (
      <div>
        <TextareaToggler character={this.props.character} name='personality' label='Personality Traits' />
        <hr />
        <TextareaToggler character={this.props.character} name='ideals' label='Ideals' />
        <hr />
        <TextareaToggler character={this.props.character} name='bonds' label='Bonds' />
        <hr />
        <TextareaToggler character={this.props.character} name='flaws' label='Flaws' />
      </div>
    );
  }
}
