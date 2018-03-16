import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import { Dialog, Button } from '@blueprintjs/core';
import OuterContainer from '../components/OuterContainer';
import InnerContainer from '../components/InnerContainer';
import Header from '../components/Header';
import SpellDetails from '../components/SpellDetails';
import api from '../lib/api';
import utils from '../lib/utils';
import _ from 'lodash';

export default class ArmorSearcher extends Component {
  render() {
    return (
      <OuterContainer>
        <Header />
        <InnerContainer>
          <div className='text-center'>Under Construction</div>
        </InnerContainer>
      </OuterContainer>
    );
  }
}
