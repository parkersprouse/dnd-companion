import React, { Component } from 'react';
import { Tooltip, Position, Text } from '@blueprintjs/core';
import { Grid } from 'semantic-ui-react';
import constants from '../../lib/constants';
import axios from 'axios';
import _ from 'lodash';

export default class SpellSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_spells: [],
      char_spells: [],
      editing_class: false,
      spell_class: props.character.spell_class || ''
    }
  }

  componentWillMount() {
    axios.get('/api/db/spells')
      .then((response) => {
        if (response.status === constants.http_ok) {
          const char_spells = [];
          _.forEach(response.data.content, (elem) => {
            _.forEach(this.props.character.spells, (spell) => {
              if (elem.id == spell.id) char_spells.push(elem);
            });
          });

          this.setState({ all_spells: response.data.content, char_spells });
        }
      })
      .catch((error) => {});
  }

  renderSpellList = (slot) => {
    return slot + '';
  }

  render() {
    console.log(this.state)
    return (
      <Grid stackable stretched>

        <Grid.Row centered>
          <Grid.Column width={16}>
            <hr />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              <div className='pt-form-group spellsheet-form-group'>
                <div className='pt-form-content'>
                  <div className='pt-input-group'>
                    {
                      this.state.editing_class ?
                      <div className='pt-input-group'>
                        <Tooltip content='Cancel' position={Position.TOP}>
                          <button className='pt-button pt-minimal pt-intent-danger pt-icon-cross' onClick={() => this.setState({ editing_class: false })}></button>
                        </Tooltip>
                        <input type='text' className='pt-input' value={this.state.spell_class} name='spell_class' onChange={(event) => this.setState({ [event.target.name]: event.target.value })}/>
                        <Tooltip content='Save' position={Position.TOP}>
                          <button className='pt-button pt-minimal pt-intent-success pt-icon-lock' onClick={() => this.setState({ editing_class: false })}></button>
                        </Tooltip>
                      </div> :
                      <Tooltip content='Click to edit' position={Position.TOP}>
                        <span style={{ fontWeight: 'bold' }} onClick={() => this.setState({ editing_class: true })}>
                          { this.state.spell_class || 'None' }
                        </span>
                      </Tooltip>
                    }

                  </div>
                  <div className='pt-form-helper-text'>Spellcasting Class</div>
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card'>
              Other stuff
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              Level 0
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(3) }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(6) }
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(1) }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(4) }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(7) }
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(2) }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(5) }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='pt-card'>
              { this.renderSpellList(8) }
            </div>
            <div className='pt-card' style={{ marginTop: '2rem' }}>
              { this.renderSpellList(9) }
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
