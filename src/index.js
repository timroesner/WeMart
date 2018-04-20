import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import {SetStyles} from "ic-snacks";
import {StyleRoot} from "radium";

import Router from './Router.js';

ReactDOM.render(
    <StyleRoot>
        <SetStyles assetsUrl={'https://instacart.github.io/Snacks/src/fonts'} />
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </StyleRoot>,
  document.getElementById('root')
);

registerServiceWorker();
