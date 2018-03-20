import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import api from '../lib/api';
import _ from 'lodash';

export default class TrinketsSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trinkets: null,
      name_filter: '',
      loading: true
    };
  }

  componentWillMount() {
    api.getTrinkets((success, response) => {
      if (success) this.setState({ trinkets: response.content, loading: false });
      else this.setState({ trinkets: [], loading: false });
    });
  }

  render() {
    let rendered_trinkets = null;
    if (this.state.name_filter)
      rendered_trinkets = this.renderFilteredTrinkets();
    else
      rendered_trinkets = this.renderAllTrinkets();

    return (
      <OuterContainer>
        <Header />
        <InnerContainer>

          <Grid centered stackable>

            <Grid.Row verticalAlign='top'>
              <Grid.Column width={16} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                <div className='pt-input-group pt-fill'>
                  <span className='pt-icon pt-icon-search'></span>
                  <input type='text' className='pt-input' placeholder='Filter Trinkets'
                         onChange={(event) => this.setState({ name_filter: event.target.value })} />
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16} style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                {
                  this.state.loading ?
                    <Dimmer active inverted>
                      <Loader inverted content='Loading...' style={{ marginTop: '5rem' }} />
                    </Dimmer>
                  :
                    <table className='pt-table pt-bordered pt-striped' style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th className='text-center'>d100 Roll</th>
                          <th className='text-center'>Trinket Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        { rendered_trinkets }
                      </tbody>
                    </table>
                }
              </Grid.Column>
            </Grid.Row>

          </Grid>

        </InnerContainer>
      </OuterContainer>
    );
  }

  createTrinketList = (trinkets) => {
    return _.map(trinkets, (trinket) => {
      return (
        <tr key={trinket.roll}>
          <td>{ trinket.roll }</td>
          <td>{ trinket.desc }</td>
        </tr>
      );
    });
  }

  renderAllTrinkets = () => {
    return this.createTrinketList(this.state.trinkets);
  }

  renderFilteredTrinkets = () => {
    let filtered_trinkets = this.state.trinkets;

    if (this.state.name_filter)
      filtered_trinkets = _.filter(filtered_trinkets, (trinket) => {
        return trinket.desc.toLowerCase().indexOf(this.state.name_filter.toLowerCase()) > -1 ||
               trinket.roll.indexOf(this.state.name_filter.toLowerCase()) > -1;
      });

    return this.createTrinketList(filtered_trinkets);
  }

}
