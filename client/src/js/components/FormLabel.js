import React, { Component } from 'react';

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
