import React, { Component } from 'react';
import { Grid, List } from 'semantic-ui-react';
import _ from 'lodash';

export default class SpellDetails extends Component {

  render() {
    const spell = this.props.spell;
    if (!spell) return null;

    const spell_classes = _.map(spell.classes, (sc) => { return sc.name });

    let spell_desc = null;
    if (spell.desc) {
      spell_desc = _.map(spell.desc, (desc, index) => {
        return <div key={index} style={index > 0 ? { marginTop: '0.5rem' } : null}>{desc}</div>;
      });
    }

    let spell_hl = null;
    if (spell.higher_level) {
      spell_hl = _.map(spell.higher_level, (hl, index) => {
        return <div key={index} style={index > 0 ? { marginTop: '0.5rem' } : null}>{hl}</div>;
      });
    }

    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Level</div>
            <div className='spell-detail-value'>{ spell.level === 0 ? 'Cantrip' : spell.level }</div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Concentration</div>
            <div className='spell-detail-value'>{ spell.concentration }</div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Ritual</div>
            <div className='spell-detail-value'>{ spell.ritual }</div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Range</div>
            <div className='spell-detail-value'>{ spell.range }</div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Casting Time</div>
            <div className='spell-detail-value'>{ spell.casting_time }</div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Duration</div>
            <div className='spell-detail-value'>{ spell.duration }</div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Components</div>
            <div className='spell-detail-value'>
              <div>{ _.join(spell.components, ', ') }</div>
              { spell.components.indexOf('M') > -1 ? <div>{ spell.material.replace('.', '') }</div> : null }
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>School</div>
            <div className='spell-detail-value'>{ spell.school.name }</div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className='spell-detail-label'>Classes</div>
            <div className='spell-detail-value'>{ _.join(spell_classes, ', ') }</div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={15}>
            <div className='spell-detail-label'>Description</div>
            <div className='spell-detail-value'>{ spell_desc }</div>
          </Grid.Column>
        </Grid.Row>

        {
          spell_hl ?
          <Grid.Row>
            <Grid.Column width={15}>
              <div className='spell-detail-label'>Higher Level</div>
              <div className='spell-detail-value'>{ spell_hl }</div>
            </Grid.Column>
          </Grid.Row>
          : null
        }

      </Grid>
    );
  }


  renderOld() {
    const spell = this.props.spell;
    if (!spell) return null;

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
