import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import _ from 'lodash';

export default class SpellSearcherSpellDetails extends Component {
  render() {
    const spell = this.props.spell;

    const spell_classes = _.map(spell.classes, (sc) => { return sc.name });

    let spell_desc = null;
    if (spell.desc) {
      spell_desc = _.map(spell.desc, (desc, index) => {
        return <List.Item key={index}>
                <List.Content>
                  <List.Description>{ desc }</List.Description>
                </List.Content>
              </List.Item>;
      });
    }

    let spell_hl = null;
    if (spell.higher_level) {
      spell_hl = _.map(spell.higher_level, (hl, index) => {
        return <List.Item key={index}>
                <List.Content>
                  <List.Description>{ hl }</List.Description>
                </List.Content>
              </List.Item>;
      });
    }

    return (
      <List>

        {
          spell.level || spell.level === 0 ?
          <List.Item>
            <List.Content>
              <List.Header>Level</List.Header>
              <List.List style={{ paddingTop: '0.25rem' }}>
                <List.Item>
                  <List.Content>
                    <List.Description>{ spell.level === 0 ? 'Cantrip' : spell.level }</List.Description>
                  </List.Content>
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item> : null
        }

        {
          spell.desc ?
          <List.Item style={{ marginTop: '0.5rem' }}>
            <List.Content>
              <List.Header>Description</List.Header>
              <List.List style={{ paddingTop: '0.25rem' }}>
                { spell_desc }
              </List.List>
            </List.Content>
          </List.Item> : null
        }

        {
          spell.higher_level ?
          <List.Item style={{ marginTop: '0.5rem' }}>
            <List.Content>
              <List.Header>Higher Level</List.Header>
              <List.List style={{ paddingTop: '0.25rem' }}>
                { spell_hl }
              </List.List>
            </List.Content>
          </List.Item> : null
        }

        {
          spell.range ?
          <List.Item style={{ marginTop: '0.5rem' }}>
            <List.Content>
              <List.Header>Range</List.Header>
              <List.List style={{ paddingTop: '0.25rem' }}>
                <List.Item>
                  <List.Content>
                    <List.Description>{ spell.range }</List.Description>
                  </List.Content>
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item> : null
        }

        {
          spell.duration ?
          <List.Item style={{ marginTop: '0.5rem' }}>
            <List.Content>
              <List.Header>Duration</List.Header>
              <List.List style={{ paddingTop: '0.25rem' }}>
                <List.Item>
                  <List.Content>
                    <List.Description>{ spell.duration }</List.Description>
                  </List.Content>
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item> : null
        }

        {
          spell.casting_time ?
          <List.Item style={{ marginTop: '0.5rem' }}>
            <List.Content>
              <List.Header>Casting Time</List.Header>
              <List.List style={{ paddingTop: '0.25rem' }}>
                <List.Item>
                  <List.Content>
                    <List.Description>{ spell.casting_time }</List.Description>
                  </List.Content>
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item> : null
        }

        {
          spell.concentration ?
          <List.Item style={{ marginTop: '0.5rem' }}>
            <List.Content>
              <List.Header>Concentration</List.Header>
              <List.List style={{ paddingTop: '0.25rem' }}>
                <List.Item>
                  <List.Content>
                    <List.Description>{ spell.concentration }</List.Description>
                  </List.Content>
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item> : null
        }

        {
          spell.ritual ?
          <List.Item style={{ marginTop: '0.5rem' }}>
            <List.Content>
              <List.Header>Ritual</List.Header>
              <List.List style={{ paddingTop: '0.25rem' }}>
                <List.Item>
                  <List.Content>
                    <List.Description>{ spell.ritual }</List.Description>
                  </List.Content>
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item> : null
        }

        {
          spell.components ?
          <List.Item style={{ marginTop: '0.5rem' }}>
            <List.Content>
              <List.Header>Components</List.Header>
              <List.List style={{ paddingTop: '0.25rem' }}>
                <List.Item>
                  <List.Content>
                    <List.Description>{ _.join(spell.components, ', ') } { spell.components.indexOf('M') > -1 ? <span>({spell.material})</span> : null}</List.Description>
                  </List.Content>
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item> : null
        }

        {
          spell.school && spell.school.name ?
          <List.Item style={{ marginTop: '0.5rem' }}>
            <List.Content>
              <List.Header>School</List.Header>
              <List.List style={{ paddingTop: '0.25rem' }}>
                <List.Item>
                  <List.Content>
                    <List.Description>{ spell.school.name }</List.Description>
                  </List.Content>
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item> : null
        }

        {
          spell.classes ?
          <List.Item style={{ marginTop: '0.5rem' }}>
            <List.Content>
              <List.Header>Classes</List.Header>
              <List.List style={{ paddingTop: '0.25rem' }}>
                <List.Item>
                  <List.Content>
                    <List.Description>{ _.join(spell_classes, ', ') }</List.Description>
                  </List.Content>
                </List.Item>
              </List.List>
            </List.Content>
          </List.Item> : null
        }

      </List>
    );
  }
}
