import React, { Component } from 'react';

export default class Container extends Component {
  render() {
    return (
      <div className="container main-container">
        { this.props.children }
      </div>
    );
  }
}
