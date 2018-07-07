import React, { Component } from 'react';
import api from '../lib/api';

export default class WeaponPropertyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: null
    };
  }

  componentWillMount() {
    api.filterWeaponProperties({ name: this.props.property }, (success, response) => {
      if (success) {
        this.setState({
          property: response.content[0]
        });
      }
    });
  }

  render() {
    if (!this.state.property) return null;

    let desc = [];
    if (this.state.property.desc)
      desc = this.state.property.desc.map((d) => {
        return <p key={d}>{ d }</p>;
      });

    return (
      <div>
        <h5>{ this.state.property.name }</h5>
        { desc }
      </div>
    );
  }
}
