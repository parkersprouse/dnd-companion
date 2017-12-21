import React, { Component } from 'react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import utils from '../lib/utils';

export default class FormLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      required: this.props.required !== undefined
    }
  }

  render() {
    if (this.state.required) {
      return (
        <span>
          { this.props.children } <span className='required-label'>*</span>
        </span>
      );
    }
    else {
      return (
        <span>
          { this.props.children }
        </span>
      );
    }
  }
}
