import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './js/AppRouter';
import registerServiceWorker from './js/registerServiceWorker';

import './css/bootstrap.min.css';
import '@blueprintjs/core/dist/blueprint.css';
import './css/styles.css';

import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render((
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
