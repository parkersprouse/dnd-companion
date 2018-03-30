import React, { Component } from 'react';

export default class FormLabel extends Component {
  render() {
    if (this.props.required !== undefined)
      return <span>{ this.props.children } <span className='required-label no-icon'>*</span></span>;
    return <span>{ this.props.children }</span>;
  }
}
