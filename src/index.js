import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import {themer} from 'ic-snacks';
import {wemartTheme} from './wemartTheme';

import Router from './Router.js';
themer.themeConfig = wemartTheme; //IC-Snacks theme for WeMart

ReactDOM.render(
  <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
    <Router />
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
