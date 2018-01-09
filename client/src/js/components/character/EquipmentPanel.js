import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EquipmentSelector from './selectors/EquipmentSelector';

export default class EquipmentPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempEquipment: ''
    }
  }

  addEquipment = (equip) => {
    if (!equip) return;
    const rootState = this.props.rootState;
    if (rootState && rootState.equipment) {
      rootState.equipment.push(equip);
      this.props.setRootState({ equipment: rootState.equipment });
    }
    else
      this.props.setRootState({ equipment: [equip] });
  }

  removeEquipment = (index) => {
    this.props.rootState.equipment.splice(index, 1);
    this.props.setRootState({ equipment: this.props.rootState.equipment });
  }

  render() {
    const equipmentList = [];
    if (this.props.rootState && this.props.rootState.equipment) {
      this.props.rootState.equipment.forEach((equip, index) => {
        equipmentList.push(
          <li key={index} className='pt-tree-node'>
            <div className='pt-tree-node-content'>
              <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}>{equip}</span>
              <span className='pt-tree-node-secondary-label'>
                <a onClick={() => this.removeEquipment(index)} style={{ color: 'red' }}>
                  <span className='pt-icon-cross'></span>
                </a>
              </span>
            </div>
          </li>
        );
      });
    }

    return (
      <Grid stackable centered verticalAlign='middle'>

        <Grid.Row>
          <Grid.Column width={8}>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content'>
                <div className='pt-tree pt-elevation-0'>
                  <ul className='pt-tree-node-list pt-tree-root'>
                    {
                      equipmentList.length > 0 ? equipmentList :
                      <li className='pt-tree-node'>
                        <div className='pt-tree-node-content'>
                          <span className='pt-tree-node-label' style={{ paddingLeft: '10px' }}><i>None</i></span>
                        </div>
                      </li>
                    }
                  </ul>
                </div>
                <div className='pt-form-helper-text'>Equipment</div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className='pt-form-group' style={{ marginBottom: '1rem' }}>
              <div className='pt-form-content'>
                <div className='pt-control-group pt-fill'>
                  <input name='tempEquipment' value={this.state.tempEquipment} className='pt-input pt-fill' type='text'
                         onChange={(event) => this.setState({ [event.target.name]: event.target.value })} />
                  <button className='pt-button pt-intent-primary pt-fixed'
                          onClick={() => { this.setState({ tempEquipment: '' }); this.addEquipment(this.state.tempEquipment); }}>Add</button>
                </div>
                <div className='pt-form-helper-text'>Custom Equipment</div>
              </div>
            </div>
            <div className='pt-form-group' style={{ marginBottom: '0' }}>
              <div className='pt-form-content searcher'>
                <EquipmentSelector addEquipment={this.addEquipment} />
                <div className='pt-form-helper-text'>Standard Equipment</div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
