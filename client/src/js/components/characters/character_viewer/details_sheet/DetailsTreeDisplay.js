import React, { Component } from 'react';
import _ from 'lodash';

export default class DetailsTreeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content && props.content.length > 0 ?
      _.sortBy(props.content, (i) => i.name ? i.name : i) : []
    }
  }

  componentWillReceiveProps(next_props) {
    this.setState({
      content: next_props.content && next_props.content.length > 0 ?
      _.sortBy(next_props.content, (i) => i.name ? i.name : i) : []
    });
  }

  render() {
    const content = this.renderContent();
    return (
      <div className='pt-tree pt-elevation-0'>
        <ul className='pt-tree-node-list pt-tree-root'>
          {
            content.length > 0 ? content :
            <li className='pt-tree-node'>
              <div className='pt-tree-node-content'>
                <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}><i>None</i></span>
              </div>
            </li>
          }
        </ul>
      </div>
    );
  }

  renderContent = () => {
    return _.map(this.state.content, (ele, index) => {
      return (
        <li key={index} className='pt-tree-node'>
          <div className='pt-tree-node-content'>
            <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>{ele}</span>
            <span className='pt-tree-node-secondary-label'>
              <a onClick={() => this.props.remove(ele)} className='remove-item-btn'>
                <span className='pt-icon-cross'></span>
              </a>
            </span>
          </div>
        </li>
      );
    });
  }
}
