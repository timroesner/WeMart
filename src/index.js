import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import {SetStyles} from "ic-snacks";
import {StyleRoot} from "radium";

import Router from './Router.js';

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
