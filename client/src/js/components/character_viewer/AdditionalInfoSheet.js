import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class AdditionalInfoSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      height: '',
      weight: '',
      eye_color: '',
      skin_color: '',
      hair_color: '',
      
    };
  }
  render() {
    return (
      <Grid stackable centered>

        <Grid.Row>
          <Grid.Column width={15}>
            <div className='pt-card'>
              Hair Color
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <Grid.Column width={5}>
            <div className='pt-card'>
              Backstory
            </div>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              Allies and Orgs
            </div>
            <div className='pt-card' style={{ marginBottom: '2rem' }}>
              Additional Feats and Traits
            </div>
            <div className='pt-card'>
              Treasure
            </div>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}
