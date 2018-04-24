import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import {themer} from 'ic-snacks';
import {wemartTheme} from './wemartTheme';
import {SetStyles} from "ic-snacks";
import {StyleRoot} from "radium";

import Router from './Router.js';
themer.themeConfig = wemartTheme; //IC-Snacks theme for WeMart

const fonts = 'https://s3-us-west-1.amazonaws.com/wemartimages/fonts'

ReactDOM.render(
    <StyleRoot>
        <SetStyles assetsUrl={fonts} />
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </StyleRoot>,
  document.getElementById('root')
);

registerServiceWorker();
