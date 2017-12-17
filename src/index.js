import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import registerServiceWorker from './registerServiceWorker';

import './styles/bootstrap.min.css';
import '@blueprintjs/core/dist/blueprint.css';
import './styles/styles.css';

import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render((
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
