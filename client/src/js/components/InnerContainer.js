import React, { Component } from 'react';

export default class InnerContainer extends Component {
  render() {
    return (
      <div className='container'>
        { this.props.children }
      </div>
    );
  }
}
