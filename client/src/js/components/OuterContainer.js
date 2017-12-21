import React, { Component } from 'react';

export default class OuterContainer extends Component {
  render() {
    return (
      <div className='main-container'>
        { this.props.children }
      </div>
    );
  }
}
