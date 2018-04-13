import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
<<<<<<< HEAD
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import {themer} from "ic-snacks";
import {wemartTheme} from './wemartTheme';
=======
import { BrowserRouter, Route } from 'react-router-dom';
>>>>>>> master

import Router from './Router.js';
themer.themeConfig = wemartTheme; //IC-Snacks theme for WeMart

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>, 
  document.getElementById('root')
);

registerServiceWorker();
